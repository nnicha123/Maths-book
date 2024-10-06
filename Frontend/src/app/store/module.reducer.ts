import { Action, createReducer } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "./definitions/store.definitions";
import { loginUserReducer } from "./login-user/login-user.reducer";
import { retrieveQuestionsReducer } from "./retrieve-questions/retrieve-questions.reducer";
import { refershUserReducer } from "./refresh-user/refresh-user.reducer";
import { logoutUserReducer } from "./logout-user/logout-user.reducer";
import { CalculateRankingReducer } from "./calculate-rankings/calculate-rankings.reducer";
import { TurnPageReducer } from "./turn-page/turn-page.reducer";
import { SubmitExerciseReducer } from "./submit-exercise/submit-exercise.reducer";
import { retrieveAnswersReducer } from "./retrieve-answers/retrieve-answers.reducer";

export const initialState: ModuleEntityState = moduleEntityAdapter.getInitialState({
  selectedId: null
});

const { selectIds, selectEntities, selectAll } = moduleEntityAdapter.getSelectors();

export const idsSelector = selectIds;
export const entitiesSelector = selectEntities;
export const selectAllEntities = selectAll;

const _reducer = createReducer(
  initialState,
  ...loginUserReducer(),
  ...logoutUserReducer(),
  ...refershUserReducer(),
  ...retrieveQuestionsReducer(),
  ...CalculateRankingReducer(),
  ...TurnPageReducer(),
  ...SubmitExerciseReducer(),
  ...retrieveAnswersReducer()
);

export function moduleReducer(state: ModuleEntityState | undefined, action: Action) {
  return _reducer(state, action)
};