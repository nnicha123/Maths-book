import { createAction } from "@ngrx/store";

enum LogoutUserActions {
    LOGOUT_USER = '[User] Logout User',
}

export const logoutUser = createAction(LogoutUserActions.LOGOUT_USER);
