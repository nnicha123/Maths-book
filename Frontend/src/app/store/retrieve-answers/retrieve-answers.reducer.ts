import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-answers.action'
import { getData, mapCorrectAnswer } from "../utils";
import { Exercise } from "../../models/Exercise.model";



export function retrieveAnswersReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.retrieveAnswers, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'loading'
                        },
                    },
                    state
                )
            }
        }),
        on(fromActions.retrieveAnswersSuccess, (state, action) => {
            const data = getData(state);
            const answers = action.answers;
            const exercises = data.exercises;
            const updatedExercises: Exercise[] = exercises.map(exercise => {
                return {
                    ...exercise,
                    questions: mapCorrectAnswer(exercise.questions, answers),
                }
            })
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                exercises: updatedExercises,
                                answers: answers

                            },
                            status: 'ready'

                        },
                    },
                    state
                ),
            }
        }),
        on(fromActions.retrieveAnswersError, (state, action) => {
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


