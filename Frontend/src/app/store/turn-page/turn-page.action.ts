import { createAction, props } from "@ngrx/store";

enum TurnPageActions {
    TURN_PAGE_FORWARD = '[Turn Page] Turn Page Forward',
    TURN_PAGE_FORWARD_SUCCESS = '[Turn Page] Turn Page Forward Success',
    TURN_PAGE_FORWARD_ERROR = '[Turn Page] Turn Page Forward Error',

    TURN_PAGE_BACKWARD = '[Turn Page] Turn Page Backward',
    TURN_PAGE_BACKWARD_SUCCESS = '[Turn Page] Turn Page Backward Success',
    TURN_PAGE_BACKWARD_ERROR = '[Turn Page] Turn Page Backward Error',
}

export const turnPageForward = createAction(
    TurnPageActions.TURN_PAGE_FORWARD
);

export const turnPageForwardSuccess = createAction(
    TurnPageActions.TURN_PAGE_FORWARD_SUCCESS
);

export const turnPageForwardError = createAction(
    TurnPageActions.TURN_PAGE_FORWARD_ERROR,
    props<{ error: any }>()
);

export const turnPageBackward = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD
);

export const turnPageBackwardSuccess = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD_SUCCESS
);

export const turnPageBackwardError = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD_ERROR,
    props<{ error: any }>()
);

