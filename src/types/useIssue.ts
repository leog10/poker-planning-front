import { Issue } from './Issue';

type useIssue = {
  editTitle: {
    openEditTitle: boolean;
    issueTitle: string;
    handleEditTitle: () => void;
    handleSaveIssueTitle: (
      id: string,
      textFieldValue: string,
      roomId: string
    ) => void;
  };
  editLink: {
    openEditLink: boolean;
    issueLink: string;
    handleEditLink: () => void;
    handleSaveIssueLink: (
      id: string,
      textFieldValue: string,
      roomId: string
    ) => void;
  };
  editDescription: {
    openEditDescription: boolean;
    issueDescription: string;
    handleEditDescription: () => void;
    handleSaveIssueDescription: (
      id: string,
      textFieldValue: string,
      roomId: string
    ) => void;
  };
  editStoryPoints: {
    openStoryPointsMenu: boolean;
    storyPoints: string;
    handleEditStoryPoints: (
      id: string,
      storyPoints: string,
      voting?: boolean,
      roomId?: string
    ) => void;
    handleStoryPointsMenu: (
      e?: React.MouseEvent<HTMLElement, MouseEvent>
    ) => void;
    handleCloseStoryPointsMenu: () => void;
  };
  editVotingNow: {
    votingNow: boolean;
    handleVotingNow: (id: string, roomId: string) => void;
  };
  issues: {
    handleAddIssue: (title: string, revealing: boolean, roomId: string) => void;
    handleDeleteIssue: (id: string, roomId: string) => void;
    handleDeleteAllIssues: (roomId: string) => void;
    roomIssues: Issue[];
    setRoomIssues: React.Dispatch<React.SetStateAction<Issue[]>>;
  };
};

export default useIssue;
