import { Exercise } from "../models/Exercise.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";

export interface ModuleData {
    id: string;
    user: User;
    exercises:Exercise[];
    questions:Question[];
}

export type ModuleStatus = 'loading' | 'ready' | 'error';