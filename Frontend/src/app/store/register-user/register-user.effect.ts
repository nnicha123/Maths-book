import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './register-user.action';
import { map, switchMap } from "rxjs";
import { RegisterService } from "../../services/register/register.service";
import { User } from "../../models/User.model";

@Injectable()
export class RegisterUserEffect {
    constructor(private actions$: Actions, private registerService: RegisterService) { }

    registerUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.registerUser),
            switchMap((action) => {
                const newUser = action.newUser;
                return this.registerService.registerUser(newUser).pipe(
                    map((user: User) => fromActions.registerUserSuccess({ user }))
                )
            })
        )
    )
}