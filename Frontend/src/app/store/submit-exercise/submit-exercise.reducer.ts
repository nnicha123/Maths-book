import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './submit-exercise.action';
import { calculateScore, getData } from "../utils";

export function SubmitExerciseReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.submitExercise, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'loading'
                        }
                    },
                    state
                )
            }
        }),
        on(fromActions.submitExerciseSuccess, (state, action) => {
            const data = getData(state);
            const exercises = data.exercises;
            const questions = action.questions;
            const selectedExerciseNumber = questions[0].exerciseNumber;

            const selectedExerciseIndex = exercises.findIndex(ex => ex.exerciseNumber === selectedExerciseNumber);
            if (selectedExerciseIndex != -1) {
                const selectedExercise = {
                    ...exercises[selectedExerciseIndex],
                    score: calculateScore(questions),
                    submitted: true
                }

                selectedExercise.questions = questions;
                exercises[selectedExerciseIndex] = selectedExercise;

            }
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            isLoggedIn: true,
                            status: 'ready',
                            data: {
                                ...data,
                                exercises
                            }

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