import { Action, createReducer } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "./definitions/store.definitions";
import { loginUserReducer } from "./login-user/login-user.reducer";

export const initialState: ModuleEntityState = moduleEntityAdapter.getInitialState({
    selectedId: null
});

const { selectIds, selectEntities, selectAll } = moduleEntityAdapter.getSelectors();

export const idsSelector = selectIds;
export const entitiesSelector = selectEntities;
export const selectAllEntities = selectAll;

const _reducer = createReducer(
  initialState,
  ...loginUserReducer()
);

export function moduleReducer(state:ModuleEntityState|undefined, action:Action){
  return _reducer(state,action)
};