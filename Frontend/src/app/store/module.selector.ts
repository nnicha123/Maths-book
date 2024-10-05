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
);

export const selectCurrentPage = createSelector(
  selectData,
  data => data ? data.currentPage : 1
);

export const selectPagesInformation = createSelector(
  selectData,
  data => data ? data.pages : []
);

export const selectStatus = createSelector(
  selectEntity,
  entity => entity ? entity.status : 'error'
);

export const selectIsLoggedIn = createSelector(
  selectEntity,
  entity => entity ? entity.isLoggedIn : false
);

export const selectIsLoading = createSelector(
  selectStatus,
  status => status ? status === 'loading' : false
);

export const selectQuestions = createSelector(
  selectData,
  data => data ? data.questions : []
);

export const selectExercises = createSelector(
  selectData,
  data => data ? data.exercises : []
);

export const selectQuestionsFromExercise = (exerciseNumber: number) => createSelector(
  selectQuestions,
  (questions) => questions.filter(question => question.exerciseNumber == exerciseNumber)
);