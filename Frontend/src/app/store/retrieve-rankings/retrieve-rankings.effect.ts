import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './retrieve-rankings.action';
import * as fromSubmitExerciseActions from '../submit-exercise/submit-exercise.action';
import * as fromLoginActions from '../login-user/login-user.action';
import * as fromRefreshUserActions from '../refresh-user/refresh-user.action';
import { map, switchMap, withLatestFrom } from "rxjs";
import { calculateRank } from "../utils";
import * as fromSelectors from '../module.selector';
import { select, Store } from "@ngrx/store";
import { ModuleEntityState } from "../definitions/store.definitions";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { User } from "../../models/User.model";
import { Rank } from "../../models/Rank.model";

@Injectable()
export class RetrieveRankingEffect {
    constructor(private actions$: Actions, private store: Store<{ module: ModuleEntityState }>,
        private exerciseService: ExerciseService
    ) { }

    loginUserSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromLoginActions.loginUserSuccess, fromRefreshUserActions.refreshUserSuccess),
            switchMap((action) => {
                const userId = action.user;
                return [fromActions.retrieveAllRankings()]
            })
        )
    )

    calculateRankingSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.calculateRankingSuccess),
            switchMap(() => [fromActions.retrieveAllRankings()])
        )
    )

    retrieveAllRankings$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.retrieveAllRankings),
            switchMap(() => {
                return this.exerciseService.getAllRankings().pipe(
                    map((ranks: Rank[]) => fromActions.retrieveAllRankingsSuccess({ ranks }))
                )
            })
        )
    )

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