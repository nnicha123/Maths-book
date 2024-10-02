import { ModuleData } from "../../definitions/module.definition";
import { User } from "../../models/User.model";
import { ModuleEntityState } from "../definitions/store.definitions";
import cloneDeep from 'lodash.clonedeep';

export function getData(state: ModuleEntityState): ModuleData {
    const data: ModuleData = cloneDeep(state.entities[state.selectedId || '0']!.data);
    return data;
}

const initialUser: User = {
    userId: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    currentLevel: 0
}

export const initialData: ModuleData = {
    id: '0',
    user: { ...initialUser },
    exercises: [],
    questions: []
}