import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { CardVotes } from "../types/CardVotes";
import { User } from "../types/User";
import useCards from "./useCards";
import useIssue from "./useIssue";
import useTimer from "./useTimer";
import useUser from "./useUser";

const useCreateRoom = (socket: Socket) => {
  const [roomId, setRoomId] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allowedReveal, setAllowedReveal] = useState(false);
  const [allowedNewGame, setAllowedNewGame] = useState(false);
  const [gameName, setGameName] = useState<string>("");
  const [users, setUsers] = useState<User[]>();
  const [average, setAverage] = useState<number | undefined>();
  const [confettiTime, setConfettiTime] = useState(false);
  const { roomParamId } = useParams();

  const { time, countdown } = useTimer();
  const navigate = useNavigate();

  const user = useUser(socket);
  const cards = useCards(socket);
  const issue = useIssue(socket);

  const handleChooseUsername = useCallback(() => {
    user.changeUsername(roomId);
    setGameStarted(true);
  }, [user.username]);

  const createRoom = useCallback(
    (username: string, gameName: string, clientId: string) => {
      if (clientId) {
        socket.emit("client:create_room", { username, gameName, clientId });
      } else {
        socket.emit("client:create_room", { username, gameName });
      }
      if (username) {
        setGameStarted(true);
      }
      setAllowedReveal(true);
      setAllowedNewGame(true);
    },
    [user.username]
  );

  const joinRoom = useCallback(
    (roomId: string, username: string, clientId: string) => {
      if (clientId) {
        socket.emit("client:join_room", { roomId, username, clientId });
      } else {
        socket.emit("client:join_room", { roomId, username });
      }
    },
    [user.username]
  );

  const validateFullConsenus = (cardsVotes: CardVotes[]) => {
    const checkCard = cardsVotes[0].card;

    if (cardsVotes.some((card) => card.card === "🧉")) {
      return;
    }

    if (cardsVotes.every((card) => card.card === checkCard)) {
      setTimeout(() => {
        setConfettiTime(true);
      }, 1000);

      setTimeout(() => {
        setConfettiTime(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (roomParamId) {
      setRoomId(roomParamId);
      joinRoom(roomId, user.username || "", user.clientId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on(
      "server:user_joined",
      ({
        roomUsers,
        reveal,
        gameName,
        mateTime,
        cardsVotes,
        average,
        gameOptions,
        issues,
      }) => {
        setUsers(roomUsers);
        cards.setRevealing(reveal);
        setGameName(gameName);
        cards.setMate(mateTime);
        cards.setCardsVotes(cardsVotes);
        setAverage(average);
        issue.issues.setRoomIssues(issues);

        if (user.username) {
          setGameStarted(true);
        }

        const allowedManageGame = gameOptions.allowedReveal.some(
          (u: User) => u.clientId === user.clientId
        );

        setAllowedNewGame(allowedManageGame);
        setAllowedReveal(allowedManageGame);
      }
    );
  }, [user.clientId]);

  useEffect(() => {
    socket.on("server:new_room", ({ roomId, users }) => {
      setRoomId(roomId);
      setUsers(users);
      window.history.replaceState(null, `Game ${gameName}`, `${roomId}`);
    });

    socket.on("server:users", ({ roomVoting, reveal }) => {
      setUsers(roomVoting);
      cards.setRevealing(reveal);
    });

    socket.on("server:reveal_cards", ({ averageVoting, cardsVotes }) => {
      cards.setCardsVotes(cardsVotes);
      setAverage(averageVoting);
      cards.setRevealing(true);
      validateFullConsenus(cardsVotes);
      countdown();
    });

    socket.on("server:start_new_voting", ({ roomUsers }) => {
      cards.setRevealing(false);
      setUsers(roomUsers);
      setAverage(undefined);
      cards.setCardsVotes([]);
      cards.setMate(false);
      cards.setCanReveal(false);
      cards.fiboCards.forEach((fibo) => (fibo.checked = false));
    });

    socket.on("server:invalid_room", () => {
      setGameStarted(false);
      navigate("/404");
    });

    socket.on("server:issues", (issues) => {
      issue.issues.setRoomIssues(issues);
    });
  }, []);

  return {
    room: {
      roomId,
      createRoom,
      cards: cards.cardsVotes,
      fiboCards: cards.fiboCards,
      setGameName,
      gameStarted,
      revealing: cards.revealing,
      gameName,
      users,
      average,
      mate: cards.mate,
      handleChooseUsername,
      revealingTime: time,
      confettiTime,
    },
    user: {
      username: user.username,
      clientId: user.clientId,
      setUsername: user.setUsername,
      changeUsername: user.changeUsername,
      canReveal: cards.canReveal,
      handleCardSelect: cards.handleCardSelect,
      allowedReveal,
      allowedNewGame,
      startNewVoting: cards.startNewVoting,
      revealCards: cards.revealCards,
    },
    issue,
  };
};

export default useCreateRoom;
