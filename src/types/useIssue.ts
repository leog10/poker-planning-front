import { Issue } from "./Issue";

type useIssue = {
    editTitle: {
        openEditTitle: boolean;
        issueTitle: string;
        handleEditTitle: () => void;
        handleSaveIssueTitle: (id: string, textFieldValue: string) => void;
    };
    editLink: {
        openEditLink: boolean;
        issueLink: string;
        handleEditLink: () => void;
        handleSaveIssueLink: (textFieldValue: string) => void;
    };
    editDescription: {
        openEditDescription: boolean;
        issueDescription: string;
        handleEditDescription: () => void;
        handleSaveIssueDescription: (id: string, textFieldValue: string) => void;
    }
    editStoryPoints: {
        openStoryPointsMenu: boolean;
        storyPoints: string;
        handleEditStoryPoints: (id: string, storyPoints: string) => void;
        handleStoryPointsMenu: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        handleCloseStoryPointsMenu: () => void;
    }
    editVotingNow: {
        votingNow: boolean;
        handleVotingNow: (id: string) => void;
    }
    issues: {
        handleAddIssue: (title: string) => void;
        handleDeleteIssue: (id: string) => void;
        roomIssues: Issue[];
    }
}

export default useIssue;