import { Exercise } from "../models/Exercise.model";
import { Page } from "../models/Page.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";

export interface ModuleData {
    id: string;
    user: User;
    exercises: Exercise[];
    questions: Question[];
    currentPage: number,
    pages: Page[];
}

export type ModuleStatus = 'loading' | 'ready' | 'error';