import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './submit-exercise.action';
import { map, switchMap, withLatestFrom } from "rxjs";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { ExerciseForm } from "../../models/ExerciseForm.model";
import { Exercise } from "../../models/Exercise.model";
import { calculateScore } from "../utils";
import { Question } from "../../models/Question.model";
import * as fromSelectors from '../module.selector';
import { ModuleEntityState } from "../definitions/store.definitions";
import { select, Store } from "@ngrx/store";

@Injectable()
export class SubmitExerciseEffect {
    constructor(
        private actions$: Actions,
        private exerciseService: ExerciseService,
        private store: Store<{ module: ModuleEntityState }>) { }

    submitExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.submitExercise),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectUserId))),
            switchMap(([action, userId]) => {
                const exercise = formToApi(userId, action.exercise);
                return this.exerciseService.submitExercise(exercise).pipe(
                    map((questions: Question[]) => fromActions.submitExerciseSuccess({ questions }))
                )
            })
        )
    )
}

function formToApi(userId: number, exerciseForm: ExerciseForm): Exercise {
    const returnedExercise: Exercise = {
        exerciseId: exerciseForm.exerciseId,
        userId: userId,
        exerciseNumber: exerciseForm.exerciseNumber,
        submitted: exerciseForm.isSubmitted,
        // default score first, have a function to determine this later (need set of answers to compare to each exercise)
        score: 100,
        // update isCorrect on submit as well & calculate new score 
        questions: exerciseForm.answers.map((answer) => {
            return {
                questionId: 1,
                exerciseId: exerciseForm.exerciseId,
                exerciseNumber: exerciseForm.exerciseNumber,
                currentAnswer: answer.value,
                isCorrect: answer.isCorrect
            }
        })

    }
    return returnedExercise;
}
