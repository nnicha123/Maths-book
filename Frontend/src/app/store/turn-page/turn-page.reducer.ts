import { on, ReducerTypes } from "@ngrx/store";
import { moduleEntityAdapter, ModuleEntityState } from "../definitions/store.definitions";
import * as fromActions from './turn-page.action';
import { getData } from "../utils";
import { Exercise } from "../../models/Exercise.model";
import { ModuleData } from "../../definitions/module.definition";
import { Question } from "../../models/Question.model";

export function TurnPageReducer(): ReducerTypes<ModuleEntityState, any>[] {
    return [
        on(fromActions.turnPageForward, (state, action) => {
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
        on(fromActions.turnPageForwardSuccess, (state) => {
            const data: ModuleData = getData(state);
            const nextPage: number = data.currentPage + 1;
            return {
                ...moduleEntityAdapter.updateOne(
                    {
                        id: state.selectedId || '0',
                        changes: {
                            data: {
                                ...data,
                                currentPage: nextPage
                            },
                            isLoggedIn: true,
                            status: 'ready'

                        },
                    },
                    state

                )
            }
        }),
        on(fromActions.turnPageForwardError, (state, action) => {
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