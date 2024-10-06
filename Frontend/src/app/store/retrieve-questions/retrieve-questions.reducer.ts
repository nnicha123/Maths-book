import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-questions.action'
import { getData } from "../utils";
import { Exercise } from "../../models/Exercise.model";
import { ModuleData } from "../../definitions/module.definition";
import { Question } from "../../models/Question.model";

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
            const exercises: Exercise[] = data.exercises;

            const updatedExercises = exercises.map(exercise => {
                const filteredQuestions = questions.filter(question => question.exerciseNumber === exercise.exerciseNumber)
                return {
                    ...exercise,
                    questions: filteredQuestions,
                    score: calculateScore(filteredQuestions)
                }
            })

            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                exercises: updatedExercises
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

function calculateScore(questions: Question[]): number {
    const numOfcorrectQuestions = questions.filter(question => question.isCorrect).length;
    return (numOfcorrectQuestions / questions.length) * 100
}