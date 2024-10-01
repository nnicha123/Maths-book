import { Exercise } from "../models/Exercise.model";
import { User } from "../models/User.model";

export interface ModuleData {
    id: string;
    user: User;
    exercises:Exercise[]
}

export type ModuleStatus = 'loading' | 'ready' | 'error';