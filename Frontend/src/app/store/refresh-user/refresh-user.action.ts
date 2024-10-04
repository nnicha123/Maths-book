import { createAction, props } from "@ngrx/store";
import { User } from "../../models/User.model";

enum RefreshUserActions {
    CHECK_IF_NEED_REFRESH = '[User] Check if user refresh needed',
    REFRESH_USER = '[User] Refresh User',
    REFRESH_USER_SUCCESS = '[User] Refresh User Success',
    REFRESH_USER_ERROR = '[User] Refresh User Error',
}


export const checkIfNeedRefresh = createAction(RefreshUserActions.CHECK_IF_NEED_REFRESH, props<{userId:string}>());
export const refreshUser = createAction(RefreshUserActions.REFRESH_USER, props<{userId:string}>());
export const refreshUserSuccess = createAction(RefreshUserActions.REFRESH_USER_SUCCESS, props<{user:User}>());
export const refreshUserError = createAction(RefreshUserActions.REFRESH_USER_ERROR, props<{error:any}>());