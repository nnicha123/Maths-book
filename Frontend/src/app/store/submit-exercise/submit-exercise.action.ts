import { createAction, props } from "@ngrx/store";
import { ExerciseForm } from "../../models/ExerciseForm.model";

enum SubmitExerciseAction {
    SUBMIT_EXERCISE = '[Exercise] Submit Exercise',
    SUBMIT_EXERCISE_SUCCESS = '[Exercise] Submit Exercise Success',
    SUBMIT_EXERCISE_ERROR = '[Exercise] Submit Exercise Error',
}

export const submitExercise = createAction(
    SubmitExerciseAction.SUBMIT_EXERCISE,
    props<{ exercise: ExerciseForm }>()
);

export const submitExerciseSuccess = createAction(
    SubmitExerciseAction.SUBMIT_EXERCISE_SUCCESS
);

export const submitExerciseError = createAction(
    SubmitExerciseAction.SUBMIT_EXERCISE_ERROR
);