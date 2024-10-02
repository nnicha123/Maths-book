import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import * as fromActions from './refresh-user.action';
import { LoginService } from "../../services/login/login.service";
import { User } from "../../models/User.model";
import { Router } from "@angular/router";

@Injectable()
export class RefreshUserEffect {
    constructor(private actions$: Actions,
        private loginService: LoginService, private router: Router) { }

    refreshUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.refreshUser),
            switchMap((action) => {
                const userId = +action.userId;
                if(userId){
                    return this.loginService.getUserById(userId)
                        .pipe(
                            map((user: User) => fromActions.refreshUserSuccess({ user }))
                        )
                }
                else {
                    return [fromActions.refreshUserError({error:'Not currently logged in'})]
                }
            })
        )
    )

    refreshUserError$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.refreshUserError),
            tap(() => this.router.navigate(['/login']))
        ),
        {dispatch:false}
    )
    // refreshUserSuccess$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(fromActions.refreshUserSuccess),
    //         tap(() => {
    //             this.router.navigate(['/book']);
    //             return [];
    //         })
    //     ),
    //     { dispatch: false }
    // )
}