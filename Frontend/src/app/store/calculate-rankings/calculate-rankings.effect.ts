import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './calculate-rankings.action';
import * as fromRetrieveQuestionsActions from '../retrieve-questions/retrieve-questions.action';
import * as fromSubmitExerciseActions from '../submit-exercise/submit-exercise.action';
import { switchMap, withLatestFrom } from "rxjs";
import { calculateRank } from "../utils";
import * as fromSelectors from '../module.selector';
import { select, Store } from "@ngrx/store";
import { ModuleEntityState } from "../definitions/store.definitions";

@Injectable()
export class CalculateRankingEffect {
    constructor(private actions$: Actions, private store: Store<{ module: ModuleEntityState }>) { }

    calculateOwnRanking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.calculateRanking),
            switchMap((action) => {
                const questions = action.questions;
                const ranking = calculateRank(questions);
                return [fromActions.calculateRankingSuccess({ ranking })]
            })
        )
    )

    afterRetrieveQuestionsSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromRetrieveQuestionsActions.retrieveQuestionsSuccess),
            switchMap((action) => {
                const questions = action.questions;
                return [fromActions.calculateRanking({ questions })]
            })
        )
    )

    submitExerciseSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromSubmitExerciseActions.submitExerciseSuccess),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectAllQuestions))),
            switchMap(([_, allQuestions]) => {
                return [fromActions.calculateRanking({ questions: allQuestions })]
            })
        )
    )

}