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
        handleSaveIssueLink: (id: string, textFieldValue: string) => void;
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
        handleEditStoryPoints: (id: string, storyPoints: string, voting?: boolean) => void;
        handleStoryPointsMenu: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
        handleCloseStoryPointsMenu: () => void;
    }
    editVotingNow: {
        votingNow: boolean;
        handleVotingNow: (id: string) => void;
    }
    issues: {
        handleAddIssue: (title: string, revealing: boolean) => void;
        handleDeleteIssue: (id: string) => void;
        handleDeleteAllIssues: () => void;
        roomIssues: Issue[];
    }
}

export default useIssue;