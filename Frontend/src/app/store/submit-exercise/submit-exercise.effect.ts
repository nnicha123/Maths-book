import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './submit-exercise.action';
import { switchMap } from "rxjs";

@Injectable()
export class SubmitExerciseEffect {
    constructor(private actions$:Actions){}

    submitExercise$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.submitExercise),
            switchMap((action) => {
                return [fromActions.submitExerciseSuccess()]
            })
        )
    )
}