import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import * as fromActions from './refresh-user.action';
import { LoginService } from "../../services/login/login.service";
import { User } from "../../models/User.model";
import { Router } from "@angular/router";
import * as fromSelectors from '../module.selector';
import { select, Store } from "@ngrx/store";
import { ModuleEntityState } from "../definitions/store.definitions";

@Injectable()
export class RefreshUserEffect {
    constructor(private actions$: Actions,
        private loginService: LoginService, private router: Router,
        private store: Store<{ module: ModuleEntityState }>) { }


    checkIfNeedRefresh$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.checkIfNeedRefresh),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectIsLoggedIn))),
            switchMap(([action, isLoggedIn]) => {
                const userId = action.userId;
                if (!isLoggedIn) {
                    return [fromActions.refreshUser({ userId })]
                } else {
                    return []
                }
            })
        )
    )

    refreshUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.refreshUser),
            switchMap((action) => {
                const userId = +action.userId;
                if (userId) {
                    return this.loginService.getUserById(userId)
                        .pipe(
                            map((user: User) => fromActions.refreshUserSuccess({ user }))
                        )
                }
                else {
                    return [fromActions.refreshUserError({ error: 'Not currently logged in' })]
                }
            })
        )
    )

    refreshUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.refreshUserError),
            tap(() => this.router.navigate(['/login']))
        ),
        { dispatch: false }
    )
}