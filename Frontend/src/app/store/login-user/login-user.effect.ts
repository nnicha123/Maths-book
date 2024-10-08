import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";
import * as fromActions from './login-user.action';
import * as fromRegisterActions from '../register-user/register-user.action';
import { map, switchMap } from "rxjs/operators";
import { User } from "../../models/User.model";
import { Injectable } from "@angular/core";
import { Login } from "../../models/Login.model";

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
        const login = action.login;
        return this.loginService.loginUser(login)
          .pipe(
            map((user: User) => fromActions.loginUserSuccess({ user }))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loginUserSuccess),
      switchMap((action) => {
        const user = action.user;
        localStorage.setItem('userId', '' + user.userId);
        this.router.navigate(['/book']);
        return [];
      })
    ),
    { dispatch: false }
  )

  registerUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromRegisterActions.registerUserSuccess),
      switchMap((action) => {
        const { username, password } = action.user;
        const login: Login = { username, password }
        return [fromActions.loginUser({ login })]
      })
    )
  )

}