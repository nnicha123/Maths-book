import { select, Store } from "@ngrx/store";
import { ModuleEntityState } from "./definitions/store.definitions";
import { Login } from "../models/Login.model";
import * as fromLoginActions from './login-user/login-user.action';
import * as fromRefreshActions from './refresh-user/refresh-user.action';
import * as fromLogoutActions from './logout-user/logout-user.action';
import * as fromTurnPageActions from './turn-page/turn-page.action';
import { Injectable } from "@angular/core";
import * as fromSelectors from './module.selector'
import { combineLatest, map, Observable } from "rxjs";
import { User } from "../models/User.model";
import { Page } from "../models/Page.model";
import { Question } from "../models/Question.model";

@Injectable()
export class ModuleFacade {
    constructor(private store: Store<{ module: ModuleEntityState }>) { }

    loginUser(login: Login): void {
        this.store.dispatch(fromLoginActions.loginUser({ login }));
    }

    checkIfNeedRefresh(userId: string): void {
        this.store.dispatch(fromRefreshActions.checkIfNeedRefresh({ userId }));
    }

    refreshUser(userId: string): void {
        this.store.dispatch(fromRefreshActions.refreshUser({ userId }));
    }

    logoutUser(): void {
        this.store.dispatch(fromLogoutActions.logoutUser());
    }

    turnPageForward(): void {
        this.store.dispatch(fromTurnPageActions.turnPageForward({ isTurnAll: false }));
    }

    turnPageBackward(): void {
        this.store.dispatch(fromTurnPageActions.turnPageBackward({ isTurnAll: false }));
    }

    turnAllPagesBackward(): void {
        this.store.dispatch(fromTurnPageActions.turnAllPagesBackward());
    }

    turnAllPagesForward(): void {
        this.store.dispatch(fromTurnPageActions.turnAllPagesForward());
    }

    questionsOfExercise(exerciseNumber: number): Observable<Question[]> {
        return this.store.pipe(
            select(fromSelectors.selectQuestionsFromExercise(exerciseNumber))
        );
    }

    scorePerExercise(exerciseNumber: number): Observable<number> {
        return this.questionsOfExercise(exerciseNumber).pipe(
            map(questions => {
                if (questions && questions.length > 0) {
                    const correctAnswers = questions.filter(question => question.isCorrect);
                    return (correctAnswers.length / questions.length) * 100
                } else {
                    return 0;
                }
            })
        )
    }

    get allExerciseScores$(): Observable<number[]> {
        return combineLatest(
            [this.scorePerExercise(1),
            this.scorePerExercise(2),
            this.scorePerExercise(3),
            this.scorePerExercise(4),
            this.scorePerExercise(5)]
        );
    }

    get user$(): Observable<User> {
        return this.store.pipe(select(fromSelectors.selectUser));
    }

    get currentPage$(): Observable<number> {
        return this.store.pipe(select(fromSelectors.selectCurrentPage));
    }

    get pagesInformation$(): Observable<Page[]> {
        return this.store.pipe(select(fromSelectors.selectPagesInformation));
    }

    get isLoading$(): Observable<boolean> {
        return this.store.pipe(select(fromSelectors.selectIsLoading));
    }

    get isLoggedIn$(): Observable<boolean> {
        return this.store.pipe(select(fromSelectors.selectIsLoggedIn));
    }
}