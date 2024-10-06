import { createAction, props } from "@ngrx/store";
import { Answer } from "../../models/Answer.model";

enum RetrieveAnswersAction {
    RETRIEVE_ANSWERS = '[Answers] Retrieve Answers',
    RETRIEVE_ANSWERS_SUCCESS = '[Answers] Retrieve Answers Success',
    RETRIEVE_ANSWERS_ERROR = '[Answers] Retrieve Answers Error',
}

export const retrieveAnswers = createAction(
    RetrieveAnswersAction.RETRIEVE_ANSWERS
);

export const retrieveAnswersSuccess = createAction(
    RetrieveAnswersAction.RETRIEVE_ANSWERS_SUCCESS,
    props<{ answers: Answer[] }>()
);

export const retrieveAnswersError = createAction(
    RetrieveAnswersAction.RETRIEVE_ANSWERS_ERROR,
    props<{ error: any }>()
);

