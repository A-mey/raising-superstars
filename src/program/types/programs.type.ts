import { frequency } from "./frequency.type";

export type Program = {
    id: number;
    title: string;
    frequency: frequency;
    completed: boolean;
};