import { loginUser, loginUserError, loginUserSuccess } from "./login-user/login-user.action";
import { LoginUserEffect } from "./login-user/login-user.effect";
import { moduleReducer } from "./module.reducer";
import { RetrieveQuestionsEffect } from "./retrieve-questions/retrieve-questions.effect";
import { retrieveExercises, retrieveExercisesError, retrieveExercisesSuccess, retrieveQuestionsError, retrieveQuestionsSuccess, retrievQuestions } from "./retrieve-questions/retrieve-questions.action";
import { RefreshUserEffect } from "./refresh-user/refresh-user.effect";
import { checkIfNeedRefresh, refreshUser, refreshUserError, refreshUserSuccess } from "./refresh-user/refresh-user.action";
import { LogoutUserEffect } from "./logout-user/logout-user.effect";
import { logoutUser } from "./logout-user/logout-user.action";
import { CalculateRankingEffect } from "./calculate-rankings/calculate-rankings.effect";
import { calculateRanking, calculateRankingError, calculateRankingSuccess } from "./calculate-rankings/calculate-rankings.action";
import { turnAllPagesBackward, turnAllPagesBackwardSuccess, turnAllPagesForward, turnAllPagesForwardSuccess, turnPageBackward, turnPageBackwardError, turnPageBackwardSuccess, turnPageForward, turnPageForwardError, turnPageForwardSuccess, updateCurrentPage, updateIndex } from "./turn-page/turn-page.action";
import { TurnPageEffect } from "./turn-page/turn-page.effect";

const actions = {
    loginUser: loginUser,
    loginUserSuccess: loginUserSuccess,
    loginUserError: loginUserError,
    logoutUser: logoutUser,
    checkIfNeedRefresh: checkIfNeedRefresh,
    refreshUser: refreshUser,
    refreshUserSuccess: refreshUserSuccess,
    refreshUserError: refreshUserError,
    retrieveExercises: retrieveExercises,
    retrieveExercisesSuccess: retrieveExercisesSuccess,
    retrieveExercisesError: retrieveExercisesError,
    retrieveQuestions: retrievQuestions,
    retrieveQuestionsSuccess: retrieveQuestionsSuccess,
    retrieveQuestionsError: retrieveQuestionsError,
    calculateRanking: calculateRanking,
    calculateRankingSuccess: calculateRankingSuccess,
    calculateRankingError: calculateRankingError,
    turnPageForward: turnPageForward,
    turnPageForwardSuccess: turnPageForwardSuccess,
    turnPageForwardError: turnPageForwardError,
    turnPageBackward: turnPageBackward,
    turnPageBackwardSuccess: turnPageBackwardSuccess,
    turnPageBackwardError: turnPageBackwardError,
    turnAllPagesBackward: turnAllPagesBackward,
    turnAllPagesBackwardSuccess: turnAllPagesBackwardSuccess,
    turnAllPagesForward: turnAllPagesForward,
    turnAllPagesForwardSuccess: turnAllPagesForwardSuccess,
    updateCurrentPage: updateCurrentPage,
    updateIndex: updateIndex
};

const effects: any[] = [
    LoginUserEffect,
    LogoutUserEffect,
    RefreshUserEffect,
    RetrieveQuestionsEffect,
    CalculateRankingEffect,
    TurnPageEffect
];

export { actions, effects, moduleReducer }