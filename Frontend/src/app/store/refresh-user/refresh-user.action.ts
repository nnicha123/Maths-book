import { createAction, props } from "@ngrx/store";
import { User } from "../../models/User.model";

enum RefreshUserActions {
    REFRESH_USER = '[User] Refresh User',
    REFRESH_USER_SUCCESS = '[User] Refresh User Success',
    REFRESH_USER_ERROR = '[User] Refresh User Error',
}

export const refreshUser = createAction(RefreshUserActions.REFRESH_USER, props<{userId:string}>());
export const refreshUserSuccess = createAction(RefreshUserActions.REFRESH_USER_SUCCESS, props<{user:User}>());
export const refreshUserError = createAction(RefreshUserActions.REFRESH_USER_ERROR, props<{error:any}>());