import { ModuleData } from "../../definitions/module.definition";
import { Page } from "../../models/Page.model";
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


const pages: Page[] = [
    {
        pageId: 'turn-1',
        pageNumber: 1,
        zIndex: 15,
        isCurrentPage: true
    },
    {
        pageId: 'turn-2',
        pageNumber: 2,
        zIndex: 14,
        isCurrentPage: false
    },
    {
        pageId: 'turn-3',
        pageNumber: 3,
        zIndex: 13,
        isCurrentPage: false
    },
    {
        pageId: 'turn-4',
        pageNumber: 4,
        zIndex: 12,
        isCurrentPage: false
    },
    {
        pageId: 'turn-5',
        pageNumber: 5,
        zIndex: 11,
        isCurrentPage: false
    },
    {
        pageId: 'turn-6',
        pageNumber: 6,
        zIndex: 10,
        isCurrentPage: false
    },
]

export const initialData: ModuleData = {
    id: '0',
    user: { ...initialUser },
    exercises: [],
    questions: [],
    currentPage: 1,
    pages: pages
}