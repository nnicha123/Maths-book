import { loginUser, loginUserError, loginUserSuccess } from "./login-user/login-user.action";
import { LoginUserEffect } from "./login-user/login-user.effect";
import { featureKey } from "./definitions/store.definitions";
import { moduleReducer } from "./module.reducer";

const actions = {
    loginUser: loginUser,
    loginUserSuccess: loginUserSuccess,
    loginUserError: loginUserError
};

const effects: any[] = [
    LoginUserEffect
];

export { featureKey, actions, effects, moduleReducer }