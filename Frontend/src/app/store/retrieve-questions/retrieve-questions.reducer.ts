import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-questions.action'
import { User } from "../../models/User.model";
import { getData } from "../utils";
import { Exercise } from "../../models/Exercise.model";
import { ModuleData } from "../../definitions/module.definition";
import { Question } from "../../models/Question.model";

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
        on(fromActions.retrieveExercises, (state, action) => {
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
        }),
        on(fromActions.retrievQuestions, (state, action) => {
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
        on(fromActions.retrieveQuestionsSuccess, (state, action) => {
            const data: ModuleData = getData(state);
            const questions: Question[] = action.questions;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                questions
                            },
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                )
            }
        }),
        on(fromActions.retrieveQuestionsError, (state, action) => {
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