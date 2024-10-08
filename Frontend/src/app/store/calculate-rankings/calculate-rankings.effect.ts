import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './calculate-rankings.action';
import * as fromSubmitExerciseActions from '../submit-exercise/submit-exercise.action';
import { map, switchMap, withLatestFrom } from "rxjs";
import { calculateRank } from "../utils";
import * as fromSelectors from '../module.selector';
import { select, Store } from "@ngrx/store";
import { ModuleEntityState } from "../definitions/store.definitions";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { User } from "../../models/User.model";

@Injectable()
export class CalculateRankingEffect {
    constructor(private actions$: Actions, private store: Store<{ module: ModuleEntityState }>,
        private exerciseService: ExerciseService
    ) { }

    calculateOwnRanking$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.calculateRanking),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectUser))),
            switchMap(([action, user]) => {
                const questions = action.questions;
                const ranking = calculateRank(questions);
                let updatedUser = {
                    ...user,
                    currentLevel: ranking
                }
                return this.exerciseService.updateRanking(updatedUser).pipe(
                    map((user: User) => fromActions.calculateRankingSuccess({ ranking })
                    )
                )
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