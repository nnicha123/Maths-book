import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './calculate-rankings.action';
import * as fromRetrieveQuestionsActions from '../retrieve-questions/retrieve-questions.action';
import { switchMap } from "rxjs";
import { Question } from "../../models/Question.model";

@Injectable()
export class CalculateRankingEffect {
    constructor(private actions$: Actions) { }

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
}

function calculateRank(questions: Question[]): number {
    let correctQuestions = questions.filter((question) => question.isCorrect);
    let correctPercentage = correctQuestions.length / questions.length * 100;
    let ranking = 0
    if (correctPercentage > 80) {
        ranking = 5;
    } else if (correctPercentage > 60) {
        ranking = 4
    } else if (correctPercentage > 40) {
        ranking = 3;
    } else if (correctPercentage > 20) {
        ranking = 2;
    } else if (correctPercentage > 10) {
        ranking = 1;
    }
    return ranking;
}