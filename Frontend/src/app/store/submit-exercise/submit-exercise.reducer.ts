import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './submit-exercise.action';
import { getData, initialData } from "../utils";

export function SubmitExerciseReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.submitExercise, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status:'loading'
                        }
                    },
                    state
                )
            }
        }),
        on(fromActions.submitExerciseSuccess, (state, action) => {
            const data = getData(state);
            const user = data.user;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                ),
            }
        }),
        on(fromActions.submitExerciseError, (state, action) => {
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