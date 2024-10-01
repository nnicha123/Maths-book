import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { tap } from "rxjs/operators";

@Injectable()
export class TestEffect {
  constructor(private actions$: Actions) {
    console.log('TestEffect initialized'); // Check if this logs
  }

  logAction$ = createEffect(() =>
    this.actions$.pipe(
      tap(action => console.log('Action received:', action)) // Logs any action dispatched
    ),
    { dispatch: false }
  );
}