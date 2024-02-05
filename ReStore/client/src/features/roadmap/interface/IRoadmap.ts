export interface IRoadmap {
    id: number;
    text: string;
    desc: string;
    sortOrder: number;
    status:  "Planerat" | "Pågående" | "Testar" | "Lanserat"
    tag: string;
}

