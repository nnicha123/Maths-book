import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './login-user.action'
import { User } from "../../models/User.model";

const initialUser: User = {
    userId: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
}

export function loginUserReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.loginUser, (state) => {
            console.log(state.selectedId)
            return {
                ...moduleEntityAdapter.addOne(
                    {
                        data: {
                            id: state.selectedId || '0',
                            user: { ...initialUser },
                            exercises: []
                        },
                        isLoggedIn: false,
                        status: 'loading'
                    },
                    state
                )
            }
        }),
        on(fromActions.loginUserSuccess, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                id: '' + action.user.userId,
                                user: action.user,
                                exercises: []
                            },
                            isLoggedIn: true,
                            status: 'ready'
                            
                        },
                    },
                    state
                    
                ),
                selectedId:'' + action.user.userId,
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