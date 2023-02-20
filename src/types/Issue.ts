export type Issue = {
    id: string;
    title: string;
    link: string;
    description: string;
    storyPoints: string;
    voting: true | false | 'voted'
};