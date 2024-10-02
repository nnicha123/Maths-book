import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './logout-user.action'


export function logoutUserReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.logoutUser, (state) => {
            return {
                ...moduleEntityAdapter.removeAll(state)
            }
        }),
    ]
} 