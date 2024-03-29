import { useCallback, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { Issue } from "../types/Issue";

const useIssue = (socket: Socket) => {
  const [roomIssues, setRoomIssues] = useState<Issue[]>([]);

  const resetState = useCallback(() => {
    setIssueTitle("");
    setIssueLink("");
    setIssueDescription("");
    setStoryPoints("");
    setVotingNow(false);
  }, []);

  const handleEditIssue = (issue: Issue, roomId: string) => {
    socket.emit("client:edit_issue", { issue, roomId });
  };

  const [openEditTitle, setOpenEditTitle] = useState(false);
  const [issueTitle, setIssueTitle] = useState("issueTitle");

  const handleEditTitle = useCallback(() => {
    setOpenEditTitle(!openEditTitle);
  }, [openEditTitle]);

  const handleSaveIssueTitle = useCallback(
    (id: string, textFieldValue: string, roomId: string) => {
      const issue = roomIssues.find((issue) => issue.id === id);
      if (issue) {
        issue.title = textFieldValue;
        setIssueTitle(textFieldValue);

        handleEditIssue(issue, roomId);
      }
    },
    [roomIssues]
  );

  const [openEditLink, setOpenEditLink] = useState(false);
  const [issueLink, setIssueLink] = useState("");

  const handleEditLink = useCallback(() => {
    setOpenEditLink(!openEditLink);
  }, [openEditLink]);

  const handleSaveIssueLink = useCallback(
    (id: string, textFieldValue: string, roomId: string) => {
      const PROTOCOLS = [
        "http",
        "http:",
        "http:/",
        "http://",
        "https",
        "https:",
        "https:/",
        "https://",
      ];
      const issue = roomIssues.find((issue) => issue.id === id);
      if (!issue) return;

      if (!textFieldValue) {
        issue.link = textFieldValue;
        setIssueLink("");
        handleEditIssue(issue, roomId);
        return;
      }

      for (const protocol of PROTOCOLS) {
        if (textFieldValue.includes(protocol)) {
          issue.link = textFieldValue;
          setIssueLink(textFieldValue);
          handleEditIssue(issue, roomId);
          return;
        }
      }

      setIssueLink("https://" + textFieldValue);
      issue.link = "https://" + textFieldValue;

      handleEditIssue(issue, roomId);
    },
    [roomIssues]
  );

  const [openEditDescription, setOpenEditDescription] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");

  const handleEditDescription = useCallback(() => {
    setOpenEditDescription(!openEditDescription);
  }, [openEditDescription]);

  const handleSaveIssueDescription = useCallback(
    (id: string, textFieldValue: string, roomId: string) => {
      const issue = roomIssues.find((issue) => issue.id === id);
      if (issue) {
        issue.description = textFieldValue;
        setIssueDescription(textFieldValue);
        handleEditIssue(issue, roomId);
      }
    },
    [roomIssues]
  );

  const [openStoryPointsMenu, setOpenStoryPointsMenu] = useState(false);
  const [storyPoints, setStoryPoints] = useState("-");

  const handleEditStoryPoints = useCallback(
    (id: string, storyPoints: string, voting?: boolean, roomId?: string) => {
      setStoryPoints(storyPoints);
      const issue = roomIssues.find((issue) => issue.id === id);
      if (issue) {
        if (issue.storyPoints === storyPoints && !voting) {
          issue.storyPoints = "-";
        } else {
          issue.storyPoints = storyPoints;
        }

        if (roomId) handleEditIssue(issue, roomId);
      }
    },
    [roomIssues]
  );

  const handleStoryPointsMenu = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const event = e?.target as HTMLElement;

      if (event.id === "storyPointsMenuBox") return;

      setOpenStoryPointsMenu(!openStoryPointsMenu);
    },
    [openStoryPointsMenu]
  );

  const handleCloseStoryPointsMenu = useCallback(() => {
    setOpenStoryPointsMenu(false);
  }, []);

  const [votingNow, setVotingNow] = useState(false);

  const handleVotingNow = useCallback(
    (id: string, roomId: string) => {
      setVotingNow(!votingNow);
      const issue = roomIssues.find((issue) => issue.id === id);
      if (issue) {
        if (issue.voting) {
          issue.voting = !issue.voting;
          handleEditIssue(issue, roomId);
        } else {
          roomIssues.forEach((issue) => (issue.voting = false));
          issue.voting = !issue.voting;
          socket.emit("client:edit_issues_voting", { issue, roomId });
        }
      }
    },
    [votingNow, roomIssues]
  );

  const handleAddIssue = useCallback(
    (title: string, revealing: boolean, roomId: string) => {
      const issue: Issue = {
        id: new Date().getTime().toString(),
        title,
        voting: roomIssues.length < 1 && !revealing,
        storyPoints: "-",
      };
      setRoomIssues((prev: Issue[]) => {
        return [...prev, issue];
      });

      socket.emit("client:new_issue", { issue, roomId });
    },
    [roomIssues]
  );

  const handleDeleteIssue = useCallback(
    (id: string, roomId: string) => {
      setRoomIssues((prev: Issue[]) => {
        return prev.filter((issue) => issue.id !== id);
      });
      resetState();
      socket.emit("client:delete_issue", { issueId: id, roomId });
    },
    [roomIssues]
  );

  const handleDeleteAllIssues = useCallback(
    (roomId: string) => {
      setRoomIssues([]);
      resetState();
      socket.emit("client:delete_all_issues", roomId);
    },
    [roomIssues]
  );

  return {
    editTitle: {
      openEditTitle,
      issueTitle,
      handleEditTitle,
      handleSaveIssueTitle,
    },
    editLink: {
      openEditLink,
      issueLink,
      handleEditLink,
      handleSaveIssueLink,
    },
    editDescription: {
      openEditDescription,
      issueDescription,
      handleEditDescription,
      handleSaveIssueDescription,
    },
    editStoryPoints: {
      openStoryPointsMenu,
      storyPoints,
      handleEditStoryPoints,
      handleStoryPointsMenu,
      handleCloseStoryPointsMenu,
    },
    editVotingNow: {
      votingNow,
      handleVotingNow,
    },
    issues: {
      handleAddIssue,
      handleDeleteIssue,
      handleDeleteAllIssues,
      roomIssues,
      setRoomIssues,
    },
  };
};

export default useIssue;
