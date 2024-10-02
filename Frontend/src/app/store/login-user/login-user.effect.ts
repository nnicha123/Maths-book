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
        const login = action.login;
        return this.loginService.loginUser(login)
          .pipe(
            map((user: User) =>  fromActions.loginUserSuccess({ user }))
          )
      })
    )
  )

  loginSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(fromActions.loginUserSuccess),
      switchMap((action) => {
        const user = action.user;
        localStorage.setItem('userId',''+user.userId);
        this.router.navigate(['/book']);
        return [];
      })
    ),
    {dispatch:false}
  )

}