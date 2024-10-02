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
            switchMap((action) => {
                return [fromActions.turnPageForwardSuccess()]
            })
        )
    )
}