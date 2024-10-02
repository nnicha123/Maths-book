import { createSelector } from "@ngrx/store";
import * as fromReducer from './module.reducer';
import { ModuleEntityState } from "./definitions/store.definitions";
import { ModuleData } from "../definitions/module.definition";
import { User } from "../models/User.model";


export const selectModuleState = (state: { module: ModuleEntityState }) => state.module;

// Select entities from state
export const selectAllEntities = createSelector(
  selectModuleState,
  fromReducer.selectAllEntities
);

// Select selectedId from state
export const selectSelectedId = createSelector(
  selectModuleState,
  (state: ModuleEntityState) => state.selectedId
);

export const selectEntity = createSelector(
  selectModuleState,
  (state: ModuleEntityState) => state.entities[state.selectedId || '0']
)

// Select the data from the selected entity
export const selectData = createSelector(
  selectEntity,
  entity => entity ? entity.data : {} as ModuleData
);

//   Select the user from the data
export const selectUser = createSelector(
  selectData,
  data => data ? data.user : {} as User
);

export const selectRanking = createSelector(
  selectUser,
  user => user ? user.currentLevel : 0
)