import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './login-user.action'
import { getData, initialData } from "../utils";

export function loginUserReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.loginUser, (state,action) => {
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
        on(fromActions.loginUserSuccess, (state, action) => {
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
        on(fromActions.loginUserError, (state, action) => {
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