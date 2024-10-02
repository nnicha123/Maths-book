import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import * as fromActions from './logout-user.action';
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class LogoutUserEffect {
    constructor(
        private actions$: Actions,
        private router: Router
    ) {
    }




    logoutUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.logoutUser),
            tap(() => {
                localStorage.removeItem('userId');
                this.router.navigate(['/login']);
                return [];
            })
        ),
        { dispatch: false }
    )

}