import { useCallback, useState } from "react";
import { Issue } from "../types/Issue";

const HARDCODEDISSUES: Issue[] = [
    {
        id: '1a',
        description: '',
        link: '',
        storyPoints: '1',
        title: '1er',
        voting: true
    },
    {
        id: '2a',
        description: '',
        link: '',
        storyPoints: '2',
        title: '2d',
        voting: false
    }
]

const useEditIssue = () => {
    const [roomIssues, setRoomIssues] = useState<Issue[]>(HARDCODEDISSUES)

    const [openEditTitle, setOpenEditTitle] = useState(false);
    const [issueTitle, setIssueTitle] = useState('issueTitle');

    const handleEditTitle = useCallback(() => {
        setOpenEditTitle(!openEditTitle);
    }, [openEditTitle]);

    const handleSaveIssueTitle = useCallback((id: string, textFieldValue: string) => {
        const issueTitle = roomIssues.find(issue => issue.id === id);
        if (issueTitle) {
            issueTitle.title = textFieldValue;
        }
        setIssueTitle(textFieldValue);
    }, [issueTitle]);

    const [openEditLink, setOpenEditLink] = useState(false);
    const [issueLink, setIssueLink] = useState('');

    const handleEditLink = useCallback(() => {
        setOpenEditLink(!openEditLink);
    }, [openEditLink]);

    const handleSaveIssueLink = useCallback((textFieldValue: string) => {
        const PROTOCOLS = ['http', 'http:', 'http:/', 'http://', 'https', 'https:', 'https:/', 'https://',]
        if (!textFieldValue) {
            return setIssueLink('')
        }

        for (const protocol of PROTOCOLS) {
            if (textFieldValue.includes(protocol)) {
                setIssueLink(textFieldValue)
                return;
            }
        }

        setIssueLink('https://' + textFieldValue);
    }, []);

    const [openEditDescription, setOpenEditDescription] = useState(false);
    const [issueDescription, setIssueDescription] = useState('');

    const handleEditDescription = useCallback(() => {
        setOpenEditDescription(!openEditDescription);
    }, [openEditDescription]);

    const handleSaveIssueDescription = useCallback((textFieldValue: string) => {
        setIssueDescription(textFieldValue);
    }, []);

    const [openStoryPointsMenu, setOpenStoryPointsMenu] = useState(false);
    const [storyPoints, setStoryPoints] = useState('-');

    const handleEditStoryPoints = useCallback((id: string, storyPoints: string) => {
        setStoryPoints(storyPoints);
        const issue = roomIssues.find(issue => issue.id === id)
        if (issue) {
            if (issue.storyPoints === storyPoints) {
                issue.storyPoints = '-'
            } else {
                issue.storyPoints = storyPoints;
            }
        }
    }, [storyPoints])

    const handleStoryPointsMenu = useCallback(
        (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
            const event = e?.target as HTMLElement;

            if (event.id === 'storyPointsMenuBox') return;

            setOpenStoryPointsMenu(!openStoryPointsMenu);
        },
        [openStoryPointsMenu]
    );

    const handleCloseStoryPointsMenu = useCallback(() => {
        setOpenStoryPointsMenu(false);
    }, []);

    const [votingNow, setVotingNow] = useState(false);

    const handleVotingNow = useCallback((id: string) => {
        setVotingNow(!votingNow)
        const issue = roomIssues.find(issue => issue.id === id)
        if (issue) {
            if (issue.voting) {
                issue.voting = !issue.voting
            } else {
                roomIssues.forEach(issue => issue.voting = false)
                issue.voting = !issue.voting
            }
        }
    }, [votingNow])

    const handleAddIssue = (title: string) => {
        const newIssue: Issue = {
            id: new Date().getTime().toString(),
            title,
            voting: false,
            storyPoints: '-'
        }
        roomIssues.push(newIssue);
        setRoomIssues(roomIssues)
    }

    return {
        editTitle: {
            openEditTitle,
            issueTitle,
            handleEditTitle,
            handleSaveIssueTitle
        },
        editLink: {
            openEditLink,
            issueLink,
            handleEditLink,
            handleSaveIssueLink
        },
        editDescription: {
            openEditDescription,
            issueDescription,
            handleEditDescription,
            handleSaveIssueDescription
        },
        editStoryPoints: {
            openStoryPointsMenu,
            storyPoints,
            handleEditStoryPoints,
            handleStoryPointsMenu,
            handleCloseStoryPointsMenu
        },
        editVotingNow: {
            votingNow,
            handleVotingNow
        },
        issues: {
            handleAddIssue,
            roomIssues
        }
    };
}

export default useEditIssue;