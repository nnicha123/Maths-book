import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './turn-page.action';
import { getData } from "../utils";
import { ModuleData, ModuleStatus } from "../../definitions/module.definition";

export function TurnPageReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.turnPageForward, fromActions.turnPageBackward, fromActions.turnAllPagesBackward, fromActions.turnAllPagesForward, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'loading',
                        }
                    },
                    state
                )
            }
        }),
        on(fromActions.turnPageForwardSuccess, (state, action) => {
            const data: ModuleData = getData(state);
            let pages = data.pages;
            const nextPage: number = data.currentPage + 1;

            if (nextPage > 1) {
                // Reset isCurrentPage
                pages[nextPage - 2].isCurrentPage = false;
                pages[nextPage - 1].isCurrentPage = true;

                // Set z-index
                pages[nextPage - 1].zIndex = pages[nextPage - 2].zIndex + 1;
            }

            const status: ModuleStatus = action.isTurnAll ? 'loading' : 'ready';
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                currentPage: nextPage,
                                pages: pages
                            },
                            isLoggedIn: true,
                            status: status

                        },
                    },
                    state

                )
            }
        }),
        on(fromActions.turnPageBackwardSuccess, (state, action) => {
            const data: ModuleData = getData(state);
            let pages = data.pages;
            const nextPage: number = data.currentPage - 1;
            pages[data.currentPage - 1].zIndex = pages[data.currentPage].zIndex + 1;

            const status: ModuleStatus = action.isTurnAll ? 'loading' : 'ready';

            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                currentPage: nextPage,
                                pages: pages
                            },
                            isLoggedIn: true,
                            status: status

                        },
                    },
                    state

                )
            }
        }),
        on(fromActions.turnAllPagesBackwardSuccess, fromActions.turnAllPagesForwardSuccess, (state, action) => {
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            status: 'ready'
                        }
                    },
                    state
                )
            }
        }),
        on((fromActions.turnPageForwardError, fromActions.turnPageBackwardError), (state, action) => {
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