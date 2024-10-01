import { Injectable } from "@angular/core";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './retrieve-questions.action';
import * as fromLoginActions from '../login-user/login-user.action';
import { map, switchMap } from "rxjs/operators";
import { Exercise } from "../../models/Exercise.model";

@Injectable()
export class RetrieveQuestionsEffect {
    constructor(
        private actions$: Actions,
        private exerciseService: ExerciseService
    ) { }

    retrieveExercises$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.retrieveExercises),
            switchMap((action) => {
                const userId = +action.userId;
                return this.exerciseService.getUserExercises(userId)
                    .pipe(
                        map((exercises: Exercise[]) => fromActions.retrieveExercisesSuccess({ exercises }))
                    )
            })
        )
    )

    loginUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLoginActions.loginUserSuccess),
            switchMap((action) => {
                const userId = action.user;
                return [fromActions.retrieveExercises(userId)]
            })
        )
    )

    // retrieveExerciseSuccess$ = createEffect(
    //     this.actions$.pipe(
    //         ofType(fromActions.retrieveExercisesSuccess),
    //         switchMap((action) => {
    //             const exercises = action.exercises;
    //             const exerciseIdList = exercises.map(value => value.exerciseId);
    //             return this.exerciseService.getAllQuestionsOfExerciseIdList(exerciseIdList)
    //             .pipe(
    //                 map((questions:Question[]) => fromActions.retrieveQuestionsSuccess({questions}))
    //             )
    //         })
    //     )
    // )


    // retrieveExerciseSuccess$ = createEffect(
    //     this.actions$.pipe(
    //         ofType(fromActions.retrieveExercisesSuccess),
    //         switchMap((action) => {
    //             const resultingActions = []
    //             const exercises = action.exercises;
    //             exercises.forEach(exercise => {
    //                 const exerciseId = exercise.exerciseId;
    //                 resultingActions.push(fromActions.retrievQuestions(exerciseId))
    //             })
    //         })
    //     )
    // )
}