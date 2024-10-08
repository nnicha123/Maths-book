import { createAction, props } from "@ngrx/store";
import { NewUser, User } from "../../models/User.model";

enum RegisterUserActions {
    REGISTER_USER = '[User] Register User',
    REGISTER_USER_SUCCESS = '[User] Register User Success',
    REGISTER_USER_ERROR = '[User] Register User Error'
}

export const registerUser = createAction(
    RegisterUserActions.REGISTER_USER,
    props<{ newUser: NewUser }>()
);

export const registerUserSuccess = createAction(
    RegisterUserActions.REGISTER_USER_SUCCESS,
    props<{ user: User }>()
);

export const registerUserError = createAction(
    RegisterUserActions.REGISTER_USER_ERROR,
    props<{ error: any }>()
)