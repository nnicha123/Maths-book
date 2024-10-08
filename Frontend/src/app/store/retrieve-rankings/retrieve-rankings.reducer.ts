import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './retrieve-rankings.action';
import { getData, initialData } from "../utils";

export function retrieveRankingReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.calculateRanking, fromActions.retrieveAllRankings, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'loading'
                        }
                    },
                    state
                )
            }
        }),
        on(fromActions.retrieveAllRankingsSuccess, (state, action) => {
            const data = getData(state);
            const user = data.user;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                allRankings: action.ranks

                            },
                            status: 'ready'

                        },
                    },
                    state

                ),
            }
        }),
        on(fromActions.calculateRankingSuccess, (state, action) => {
            const data = getData(state);
            const user = data.user;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                user: {
                                    ...user,
                                    currentLevel: action.ranking
                                }
                            },
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                ),
            }
        }),
        on(fromActions.calculateRankingError, fromActions.retrieveAllRankingsError, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'error'
                        }
                    },
                    state

                )
            }
        })
    ]
} 