import { Question } from "./Question.model";

export interface Exercise {
    exerciseId: number;
    userId: number;
    exerciseNumber: number;
    submitted: boolean;
    questions: Question[];
    score: number;
}
