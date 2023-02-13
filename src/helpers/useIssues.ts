import { useState } from "react";

type Issue = {
    id: string;
    title: string;
    link: string;
    description: string;
    storyPoints: string;
}

const HCISSUES: Issue[] = [{
    id: '1',
    title: 'My first Issue',
    link: 'http',
    description: 'descr',
    storyPoints: ''
}]

const useIssues = () => {
    const [issues, setIssues] = useState<Issue[]>(HCISSUES)
    return { roomIssues: issues };
}

export default useIssues;