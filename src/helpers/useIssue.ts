import { useCallback, useState } from "react";
import { Socket } from "socket.io-client";
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

const useIssue = (socket: Socket) => {
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
    }, [roomIssues]);

    const [openEditLink, setOpenEditLink] = useState(false);
    const [issueLink, setIssueLink] = useState('');

    const handleEditLink = useCallback(() => {
        setOpenEditLink(!openEditLink);
    }, [openEditLink]);

    const handleSaveIssueLink = useCallback((id: string, textFieldValue: string) => {
        const PROTOCOLS = ['http', 'http:', 'http:/', 'http://', 'https', 'https:', 'https:/', 'https://',]
        const issue = roomIssues.find(issue => issue.id === id);
        if (!issue) return;

        if (!textFieldValue) {
            issue.link = textFieldValue
            setIssueLink('');
            return;
        }

        for (const protocol of PROTOCOLS) {
            if (textFieldValue.includes(protocol)) {
                issue.link = textFieldValue;
                setIssueLink(textFieldValue)
                return;
            }
        }

        setIssueLink('https://' + textFieldValue);
        issue.link = 'https://' + textFieldValue;
    }, [roomIssues]);

    const [openEditDescription, setOpenEditDescription] = useState(false);
    const [issueDescription, setIssueDescription] = useState('');

    const handleEditDescription = useCallback(() => {
        setOpenEditDescription(!openEditDescription);
    }, [openEditDescription]);

    const handleSaveIssueDescription = useCallback((id: string, textFieldValue: string) => {
        const issue = roomIssues.find(issue => issue.id === id);
        if (issue) {
            issue.description = textFieldValue;
        }
        setIssueDescription(textFieldValue);
    }, [roomIssues]);

    const [openStoryPointsMenu, setOpenStoryPointsMenu] = useState(false);
    const [storyPoints, setStoryPoints] = useState('-');

    const handleEditStoryPoints = useCallback((id: string, storyPoints: string, voting?: boolean) => {
        setStoryPoints(storyPoints);
        const issue = roomIssues.find(issue => issue.id === id)
        if (issue) {
            if (issue.storyPoints === storyPoints && !voting) {
                issue.storyPoints = '-'
            } else {
                issue.storyPoints = storyPoints;
            }
        }
    }, [roomIssues])

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
    }, [votingNow, roomIssues])

    const handleAddIssue = useCallback((title: string) => {
        const newIssue: Issue = {
            id: new Date().getTime().toString(),
            title,
            voting: roomIssues.length < 1,
            storyPoints: '-'
        }
        setRoomIssues((prev: Issue[]) => {
            return [...prev, newIssue];
        })
    }, [roomIssues])

    const handleDeleteIssue = useCallback((id: string) => {
        setRoomIssues((prev: Issue[]) => {
            return prev.filter(issue => issue.id !== id)
        })
    }, [roomIssues])

    const handleDeleteAllIssues = useCallback(() => {
        setRoomIssues([])
    }, [roomIssues])

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
            handleDeleteIssue,
            handleDeleteAllIssues,
            roomIssues
        }
    };
}

export default useIssue;