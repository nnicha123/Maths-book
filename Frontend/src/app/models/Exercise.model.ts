import { Question, QuestionAPI } from "./Question.model";

export interface Exercise {
    exerciseId: number;
    userId: number;
    exerciseNumber: number;
    submitted: boolean;
    questions: Question[];
    score: number;
}

export interface ExerciseAPI {
    exerciseId: number;
    userId: number;
    exerciseNumber: number;
    submitted: boolean;
    questions: QuestionAPI[];
    score: number;
}
