import { useCallback, useState } from "react";

const useEditIssue = () => {
    const [openEditTitle, setOpenEditTitle] = useState(false);
    const [issueTitle, setIssueTitle] = useState('issueTitle');

    const handleEditTitle = useCallback(() => {
        setOpenEditTitle(!openEditTitle);
    }, [openEditTitle]);

    const handleSaveIssueTitle = useCallback((textFieldValue: string) => {
        setIssueTitle(textFieldValue);
    }, []);

    const [openEditLink, setOpenEditLink] = useState(false);
    const [issueLink, setIssueLink] = useState('');

    const handleEditLink = useCallback(() => {
        setOpenEditLink(!openEditLink);
    }, [openEditLink]);

    const handleSaveIssueLink = useCallback((textFieldValue: string) => {
        const ALLOWEDFIELDS = ['http', 'http:', 'http:/', 'http://', 'https', 'https:', 'https:/', 'https://',]
        if (!textFieldValue) {
            return setIssueLink('')
        }

        for (const protocol of ALLOWEDFIELDS) {
            if (textFieldValue.includes(protocol)) {
                setIssueLink(textFieldValue)
                return;
            }
        }



        setIssueLink('https://' + textFieldValue);

    }, []);

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
        }
    };
}

export default useEditIssue;