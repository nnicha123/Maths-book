import { createAction, props } from "@ngrx/store";

enum TurnPageActions {
    TURN_PAGE_FORWARD = '[Turn Page] Turn Page Forward',
    TURN_PAGE_FORWARD_SUCCESS = '[Turn Page] Turn Page Forward Success',
    TURN_PAGE_FORWARD_ERROR = '[Turn Page] Turn Page Forward Error',

    TURN_PAGE_BACKWARD = '[Turn Page] Turn Page Backward',
    TURN_PAGE_BACKWARD_SUCCESS = '[Turn Page] Turn Page Backward Success',
    TURN_PAGE_BACKWARD_ERROR = '[Turn Page] Turn Page Backward Error',

    TURN_ALL_PAGES_BACKWARD = '[Turn Page] Turn All Pages Backward',
    TURN_ALL_PAGES_BACKWARD_SUCCESS = '[Turn Page] Turn All Pages Backward Success',
    TURN_ALL_PAGES_BACKWARD_ERROR = '[Turn Page] Turn All Pages Backward Error',

    TURN_ALL_PAGES_FORWARD = '[Turn Page] Turn All Pages Forward',
    TURN_ALL_PAGES_FORWARD_SUCCESS = '[Turn Page] Turn All Pages Forward Success',
    TURN_ALL_PAGES_FORWARD_ERROR = '[Turn Page] Turn All Pages Forward Error',

    UPDATE_CURRENT_PAGE = '[Turn Page] Update Current Page',
    UPDATE_INDEX = '[Turn Page] Update Index'
}

export const updateCurrentPage = createAction(
    TurnPageActions.UPDATE_CURRENT_PAGE,
);

export const updateIndex = createAction(
    TurnPageActions.UPDATE_INDEX,
);

export const turnPageForward = createAction(
    TurnPageActions.TURN_PAGE_FORWARD,
    props<{ isTurnAll: boolean }>()

);

export const turnPageForwardSuccess = createAction(
    TurnPageActions.TURN_PAGE_FORWARD_SUCCESS,
    props<{ isTurnAll: boolean }>()
);

export const turnPageForwardError = createAction(
    TurnPageActions.TURN_PAGE_FORWARD_ERROR,
    props<{ error: any }>()
);

export const turnPageBackward = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD,
    props<{ isTurnAll: boolean }>()
);

export const turnPageBackwardSuccess = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD_SUCCESS,
    props<{ isTurnAll: boolean }>()
);

export const turnPageBackwardError = createAction(
    TurnPageActions.TURN_PAGE_BACKWARD_ERROR,
    props<{ error: any }>()
);

export const turnAllPagesBackward = createAction(
    TurnPageActions.TURN_ALL_PAGES_BACKWARD,
);

export const turnAllPagesBackwardSuccess = createAction(
    TurnPageActions.TURN_ALL_PAGES_BACKWARD_SUCCESS
);

export const turnAllPagesBackwardError = createAction(
    TurnPageActions.TURN_ALL_PAGES_BACKWARD_ERROR,
    props<{ error: any }>()
)

export const turnAllPagesForward = createAction(
    TurnPageActions.TURN_ALL_PAGES_FORWARD
);

export const turnAllPagesForwardSuccess = createAction(
    TurnPageActions.TURN_ALL_PAGES_FORWARD_SUCCESS
);

export const turnAllPagesForwardError = createAction(
    TurnPageActions.TURN_ALL_PAGES_FORWARD_ERROR,
    props<{ error: any }>()
);