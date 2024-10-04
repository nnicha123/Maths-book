import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './turn-page.action';
import { concatMap, delay, Observable, of, switchMap, withLatestFrom } from "rxjs";
import { Action, select, Store } from "@ngrx/store";
import * as fromSelectors from '../module.selector';
import { ModuleEntityState } from "../definitions/store.definitions";

@Injectable()
export class TurnPageEffect {
    constructor(private actions$: Actions, private store: Store<{ module: ModuleEntityState }>) { }

    turnPageForward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnPageForward),
            withLatestFrom(this.store.pipe(select(fromSelectors.selectCurrentPage))),
            switchMap(([action, currentPage]) => {
                const returnedActions: Array<Observable<Action>> = [];
                if (currentPage != 1) {
                    returnedActions.push(of(fromActions.updateIndex()))
                }
                returnedActions.push(of(fromActions.updateCurrentPage()));
                const isTurnAll = action.isTurnAll;
                returnedActions.push(of(fromActions.turnPageForwardSuccess({ isTurnAll })))
                return returnedActions
            }),
            concatMap((actions$) => actions$)

        )
    )

    turnPageBackward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnPageBackward),
            switchMap((action) => {
                const isTurnAll = action.isTurnAll;
                return [fromActions.turnPageBackwardSuccess({ isTurnAll })]
            })
        )
    )

    turnAllPagesBackward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnAllPagesBackward),
            switchMap(() => {
                const returnedActions: Array<Observable<Action>> = [];
                for (let i = 0; i < 4; i++) {
                    returnedActions.push(
                        of(fromActions.turnPageBackward({ isTurnAll: true })).pipe(delay(1000))
                    );
                }
                returnedActions.push(of(fromActions.turnAllPagesBackwardSuccess()).pipe(delay(1000)));
                return returnedActions
            }),
            // To ensure executed sequentially
            concatMap((actions$) => actions$)
        ),
    )

    turnAllPagesForward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnAllPagesForward),
            switchMap(() => {
                const returnedActions: Array<Observable<Action>> = [];
                for (let i = 0; i < 4; i++) {
                    returnedActions.push(
                        of(fromActions.turnPageForward({ isTurnAll: true })).pipe(delay(1000))
                    );
                }
                returnedActions.push(of(fromActions.turnAllPagesForwardSuccess()).pipe(delay(1000)));
                return returnedActions
            }),
            // To ensure executed sequentially
            concatMap((action$) => action$)
        )
    );

}