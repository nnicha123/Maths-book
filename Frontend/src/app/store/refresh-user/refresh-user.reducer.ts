import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './refresh-user.action'
import { User } from "../../models/User.model";
import { getData } from "../utils";
import { ModuleData } from "../../definitions/module.definition";

const initialUser: User = {
    userId: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
}

const initialData: ModuleData = {
    id: '0',
    user: { ...initialUser },
    exercises: [],
    questions: []
}

export function refershUserReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.refreshUser, (state) => {
            return {
                ...moduleEntityAdapter.addOne(
                    {
                        data: { ...initialData },
                        isLoggedIn: false,
                        status: 'loading'
                    },
                    state
                )
            }
        }),
        on(fromActions.refreshUserSuccess, (state, action) => {
            const data = getData(state);
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                id: '' + action.user.userId,
                                user: action.user,
                            },
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                ),
                selectedId: '' + action.user.userId,
            }
        }),
        on(fromActions.refreshUserError, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'error'
                        }
                    },
                    state

                )
            }
        })
    ]
} 