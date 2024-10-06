import { Injectable } from "@angular/core";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './retrieve-answers.action';
import * as fromRetrieveQuestionsActions from '../retrieve-questions/retrieve-questions.action';
import { map, switchMap } from "rxjs";
import { Answer } from "../../models/Answer.model";

@Injectable()
export class RetrieveAnswersEffect {
    constructor(private actions$: Actions, private exerciseService: ExerciseService) { }

    retrieveActions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.retrieveAnswers),
            switchMap(() => {
                return this.exerciseService.getAllAnswers().pipe(
                    map((answers: Answer[]) => fromActions.retrieveAnswersSuccess({ answers }))
                )
            })
        )
    )

    retrieveQuestionsSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRetrieveQuestionsActions.retrieveQuestionsSuccess),
            switchMap(() => {
                return [fromActions.retrieveAnswers()]
            })
        )
    )

}