import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './calculate-rankings.action';
import { getData, initialData } from "../utils";

export function CalculateRankingReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.calculateRanking, (state) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status:'loading'
                        }
                    },
                    state
                )
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
        on(fromActions.calculateRankingError, (state, action) => {
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