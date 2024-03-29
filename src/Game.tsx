import useRoom from "./helpers/useRoom";
import Cards from "./components/Cards";
import { StyledButton, StyledTextField } from "./styles";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Board from "./components/Board";
import Header from "./components/Header";
import DrawerRight from "./components/Drawer";
import { useCallback, useState } from "react";
import InviteModal from "./components/InviteModal";
import VotingResult from "./components/VotingResult";
import Confetti from "./components/Confetti";

const Game = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const { room, user, issue } = useRoom();

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, [openDrawer]);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleOpenInvite = useCallback(() => {
    setOpenInvite(true);
  }, []);

  const handleCloseInvite = useCallback(() => {
    setOpenInvite(false);
  }, []);

  const handleCreateGame = () => {
    const isValidGameName = room.gameName.trim().length > 0;

    if (isValidGameName) {
      return room.createRoom(
        user.username || "",
        room.gameName.trim(),
        user.clientId
      );
    }
  };

  const handleChooseUsername = () => {
    const isValidUsername = user?.username && user.username.trim().length > 0;

    if (isValidUsername) {
      return room.handleChooseUsername();
    }
  };

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesLg = useMediaQuery(theme.breakpoints.down("lg"));
  const matchesXl = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Header
        openDrawer={openDrawer}
        handleOpenInvite={handleOpenInvite}
        handleOpenDrawer={handleOpenDrawer}
        gameName={room.gameName}
        username={user.username}
        gameStarted={room.gameStarted}
      />

      {room.confettiTime && room.revealing && <Confetti />}

      {!room.roomId && !room.gameStarted && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginX: "auto",
            marginTop: "3.5rem",
            maxWidth: matchesSm
              ? "95%"
              : matchesMd
              ? "85%"
              : matchesLg
              ? "65%"
              : matchesXl
              ? "45%"
              : "33%",
            transition: "all .1s",
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
              marginBottom: 3,
              marginTop: -15,
              fontWeight: 400,
            }}
          >
            Choose a name for your game.
          </Typography>
          <StyledTextField
            inputProps={{
              maxLength: 50,
            }}
            sx={{
              width: "100%",
            }}
            autoComplete="off"
            variant="outlined"
            label="Game's name"
            onChange={(e) => room.setGameName(e.target.value.trim())}
            onKeyDown={(e) =>
              e.key.toLowerCase() === "enter" && handleCreateGame()
            }
          />
          <StyledButton
            sx={{ fontSize: 24, padding: "0.4rem", width: "100%" }}
            autoCapitalize="none"
            variant="contained"
            color="primary"
            disabled={!room.gameName}
            onClick={handleCreateGame}
          >
            Create game
          </StyledButton>
        </Box>
      )}

      {!room.gameStarted && room.roomId && room.gameName && (
        <Box
          sx={{
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            marginX: "auto",
            marginTop: "3.5rem",
            maxWidth: matchesSm
              ? "95%"
              : matchesMd
              ? "85%"
              : matchesLg
              ? "65%"
              : matchesXl
              ? "45%"
              : "33%",
            transition: "all .1s",
          }}
        >
          <Typography
            sx={{
              fontSize: 21,
              marginBottom: 4,
              marginTop: -15,
              fontWeight: 600,
            }}
          >
            Choose your display name
          </Typography>
          <StyledTextField
            sx={{
              width: "100%",
            }}
            inputProps={{
              maxLength: 20,
            }}
            variant="outlined"
            label="Your display name"
            type="text"
            onKeyDown={(e) =>
              e.key.toLowerCase() === "enter" && handleChooseUsername()
            }
            onChange={(e) => {
              user.setUsername(e.target.value);
            }}
            disabled={user.clientId !== undefined && user.clientId.length < 0}
          />

          <StyledButton
            sx={{ fontSize: 24, padding: "0.4rem", width: "100%" }}
            variant="contained"
            color="primary"
            disabled={!room.roomId || !user.username}
            onClick={handleChooseUsername}
          >
            Continue to game
          </StyledButton>
        </Box>
      )}

      {room.gameStarted && room.gameName && (
        <Board
          openDrawer={openDrawer}
          users={room.users}
          roomId={room.roomId}
          allowedReveal={user.allowedReveal}
          revealing={room.revealing}
          revealCards={user.revealCards}
          startNewVoting={user.startNewVoting}
          revealingTime={room.revealingTime}
          handleOpenInvite={handleOpenInvite}
          reveal={room.revealing && room.revealingTime <= 0}
        />
      )}

      {room.gameStarted && (
        <Cards
          revealing={room.revealing}
          openDrawer={openDrawer}
          roomId={room.roomId}
          clientId={user.clientId}
          fiboCards={room.fiboCards}
          handleCardSelect={user.handleCardSelect}
        />
      )}

      {room.revealing && room.gameStarted && (
        <VotingResult
          revealingTime={room.revealingTime}
          openDrawer={openDrawer}
          average={room.average}
          cards={room.cards}
          mate={room.mate}
        />
      )}

      <InviteModal open={openInvite} handleClose={handleCloseInvite} />

      <DrawerRight
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
        useIssue={issue}
        revealing={room.revealing}
        roomId={room.roomId}
      />
    </Box>
  );
};

export default Game;
