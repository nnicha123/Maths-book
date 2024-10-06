import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-answers.action'
import { getData, initialData } from "../utils";
import { Question } from "../../models/Question.model";
import { Answer } from "../../models/Answer.model";
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
                    questions: mapCorrectAnswer(exercise.questions, answers)
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


function mapCorrectAnswer(questions: Question[], answers: Answer[]) {
    return questions.map(question => ({
        ...question,
        isCorrect:getIsCorrect(question.currentAnswer, getCorrectAnswer(question, answers)),
        correctAnswer: getCorrectAnswer(question, answers)
    }))
}

function getCorrectAnswer(question: Question, answers: Answer[]): number {
    const { questionNumber, exerciseNumber } = question;
    const filteredAnswer = answers.find(answer => answer.exerciseNumber === exerciseNumber && answer.questionNumber === questionNumber);
    return filteredAnswer ? filteredAnswer.answer : 0;
}

function getIsCorrect(currentAnswer:number, correctAnswer:number){
    return currentAnswer === correctAnswer;
}