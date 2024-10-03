import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './turn-page.action';
import { switchMap } from "rxjs";

@Injectable()
export class TurnPageEffect {
    constructor(private actions$: Actions) { }

    turnPageForward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnPageForward),
            switchMap(() => {
                return [fromActions.turnPageForwardSuccess()]
            })
        )
    )

    turnPageBackward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.turnPageBackward),
            switchMap(() => {
                return [fromActions.turnPageBackwardSuccess()]
            })
        )
    )

    turnAllPagesBackward$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.turnAllPagesBackward),
            switchMap(() => {
                const returnedActions:any[] = [];
                for(let i=0;i<4;i++){
                    returnedActions.push(fromActions.turnPageBackward());
                }
                returnedActions.push(fromActions.turnAllPagesBackwardSuccess());
                return returnedActions
            })
        )
    )

    turnAllPagesForward$ = createEffect(() => 
        this.actions$.pipe(
            ofType(fromActions.turnAllPagesForward),
            switchMap(() => {
                const returnedActions:any[] = [];
                for(let i=0;i<4;i++){
                    returnedActions.push(fromActions.turnPageForward());
                }
                returnedActions.push(fromActions.turnAllPagesForwardSuccess());
                return returnedActions
            })
        )
    )
}