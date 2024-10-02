import { loginUser, loginUserError, loginUserSuccess } from "./login-user/login-user.action";
import { LoginUserEffect } from "./login-user/login-user.effect";
import { moduleReducer } from "./module.reducer";
import { RetrieveQuestionsEffect } from "./retrieve-questions/retrieve-questions.effect";
import { retrieveExercises, retrieveExercisesError, retrieveExercisesSuccess, retrieveQuestionsError, retrieveQuestionsSuccess, retrievQuestions } from "./retrieve-questions/retrieve-questions.action";

const actions = {
    loginUser: loginUser,
    loginUserSuccess: loginUserSuccess,
    loginUserError: loginUserError,
    retrieveExercises: retrieveExercises,
    retrieveExercisesSuccess: retrieveExercisesSuccess,
    retrieveExercisesError: retrieveExercisesError,
    retrieveQuestions: retrievQuestions,
    retrieveQuestionsSuccess: retrieveQuestionsSuccess,
    retrieveQuestionsError: retrieveQuestionsError
};

const effects: any[] = [
    LoginUserEffect,
    RetrieveQuestionsEffect
];

export { actions, effects, moduleReducer }