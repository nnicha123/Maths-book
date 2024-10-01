import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-questions.action'
import { User } from "../../models/User.model";
import { getData } from "../utils";
import { Exercise } from "../../models/Exercise.model";
import { ModuleData } from "../../definitions/module.definition";

const initialUser: User = {
    userId: 0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
}

export function retrieveQuestionsReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.retrieveExercises, (state) => {
            console.log(state)
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {

                            status: 'loading',
                        }

                    },
                    state
                )
            }
        }),
        on(fromActions.retrieveExercisesSuccess, (state, action) => {
            const data: ModuleData = getData(state);
            const exercises: Exercise[] = action.exercises;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                exercises
                            },
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                )
            }
        }),
        on(fromActions.retrieveExercisesError, (state, action) => {
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