import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";
import * as fromActions from './login-user.action';
import { map, switchMap, tap } from "rxjs/operators";
import { User } from "../../models/User.model";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginUserEffect {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {
  }

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loginUser),
      switchMap((action) => {
        console.log(action)
        const login = action.login;
        return this.loginService.loginUser(login)
          .pipe(
            map((user: User) => {
              console.log(user)
              return fromActions.loginUserSuccess({ user })
            })
          )
      })
    )
  )

  finishedLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loginUserSuccess, fromActions.loginUserError),
      tap(() => this.router.navigate(['/book']))
    ),
    { dispatch: false }
  )
}