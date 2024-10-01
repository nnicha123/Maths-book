import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './login-user.action'

export function loginUserReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.loginUser, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            isLoggedIn: false,
                            status:'loading'
                        }
                    },
                    state
                )
            }
        }),
        on(fromActions.loginUserSuccess, (state, action) => {
            return {
                ...moduleEntityAdapter.addOne(
                    {
                        data: {
                            id: '' + action.user.userId,
                            user: action.user,
                        },
                        isLoggedIn: true,
                        status:'ready'
                    },
                    state

                )
            }
        }),
        on(fromActions.loginUserError, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status:'error'
                        }
                    },
                    state

                )
            }
        })
    ]
} 