import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './turn-page.action';
import { concatMap, delay, Observable, of, switchMap } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class TurnPageEffect {
    constructor(private actions$: Actions) { }

    turnPageForward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnPageForward),
            switchMap((action) => {
                const isTurnAll = action.isTurnAll;
                return [fromActions.turnPageForwardSuccess({ isTurnAll })]
            })
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