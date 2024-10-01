import { createAction, props } from "@ngrx/store";
import { Login } from "../../models/Login.model";
import { User } from "../../models/User.model";

enum LoginUserAction {
    LOGIN_USER = '[User] Login User',
    LOGIN_USER_SUCCESS = '[User] Login User Success',
    LOGIN_USER_ERROR = '[User] Login User Error',
}

export const loginUser = createAction(
    LoginUserAction.LOGIN_USER,
    props<{ login: Login }>()
);

export const loginUserSuccess = createAction(
    LoginUserAction.LOGIN_USER_SUCCESS,
    props<{ user: User }>()
)

export const loginUserError = createAction(
    LoginUserAction.LOGIN_USER_ERROR,
    props<{ error: any }>()
)