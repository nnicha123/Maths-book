import { User } from "../models/User.model";

export interface ModuleData {
    id: string;
    user: User;
}

export type ModuleStatus = 'loading' | 'ready' | 'error';