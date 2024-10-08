import { Answer } from "../models/Answer.model";
import { Exercise } from "../models/Exercise.model";
import { Page } from "../models/Page.model";
import { Rank } from "../models/Rank.model";
import { User } from "../models/User.model";

export interface ModuleData {
    id: string;
    user: User;
    exercises: Exercise[];
    allRankings: Rank[];
    answers: Answer[];
    currentPage: number,
    pages: Page[];
}

export type ModuleStatus = 'loading' | 'ready' | 'error';