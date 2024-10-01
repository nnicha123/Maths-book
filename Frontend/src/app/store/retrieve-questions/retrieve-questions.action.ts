import { createAction, props } from "@ngrx/store";
import { Exercise } from "../../models/Exercise.model";
import { Question } from "../../models/Question.model";

enum RetrieveQuestionAction {
    RETRIEVE_EXERCISES = '[Exercise] Retrieve Exercises',
    RETRIEVE_EXERCISES_SUCCESS = '[Exercise] Retrieve Exercises Success',
    RETRIEVE_EXERCISES_ERROR = '[Exercise] Retrieve Exercises Error',

    RETRIEVE_QUESTIONS = '[Questions] Retrieve Questions',
    RETRIEVE_QUESTIONS_SUCCESS = '[Questions] Retrieve Questions Success',
    RETRIEVE_QUESTIONS_ERROR = '[Questions] Retrieve Questions Error',
}

export const retrieveExercises = createAction(RetrieveQuestionAction.RETRIEVE_EXERCISES, props<{ userId: number }>())
export const retrieveExercisesSuccess = createAction(RetrieveQuestionAction.RETRIEVE_EXERCISES_SUCCESS, props<{ exercises: Exercise[] }>())
export const retrieveExercisesError = createAction(RetrieveQuestionAction.RETRIEVE_EXERCISES, props<{ error: any }>())

export const retrievQuestions = createAction(RetrieveQuestionAction.RETRIEVE_QUESTIONS, props<{ exerciseId: number }>())
export const retrieveQuestionsSuccess = createAction(RetrieveQuestionAction.RETRIEVE_QUESTIONS_SUCCESS, props<{ questions: Question[] }>())
export const retrieveQuestionsError = createAction(RetrieveQuestionAction.RETRIEVE_QUESTIONS_ERROR, props<{ error: any }>())