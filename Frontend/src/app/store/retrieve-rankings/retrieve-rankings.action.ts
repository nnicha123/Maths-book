import { createAction, props } from "@ngrx/store";
import { QuestionAPI } from "../../models/Question.model";
import { Rank } from "../../models/Rank.model";

enum RetrieveRankingsActions {
    RETRIEVE_ALL_RANKINGS = '[Ranking] Retrieve All Rankings',
    RETRIEVE_ALL_RANKINGS_SUCCESS = '[Ranking] Retrieve All Rankings Success',
    RETRIEVE_ALL_RANKINGS_ERROR = '[Ranking] Retrieve All Rankings Error',

    CALCULATE_RANKING = '[Ranking] Calculate Ranking',
    CALCULATE_RANKING_SUCCESS = '[Ranking] Calculate Ranking Success',
    CALCULATE_RANKING_ERROR = '[Ranking] Calculate Ranking Error'
}

export const retrieveAllRankings = createAction(
    RetrieveRankingsActions.RETRIEVE_ALL_RANKINGS,
)

export const retrieveAllRankingsSuccess = createAction(
    RetrieveRankingsActions.RETRIEVE_ALL_RANKINGS_SUCCESS,
    props<{ ranks: Rank[] }>()
)

export const retrieveAllRankingsError = createAction(
    RetrieveRankingsActions.RETRIEVE_ALL_RANKINGS_ERROR,
    props<{ error: any }>()
)

export const calculateRanking = createAction(
    RetrieveRankingsActions.CALCULATE_RANKING,
    props<{ questions: QuestionAPI[] }>()
);

export const calculateRankingSuccess = createAction(
    RetrieveRankingsActions.CALCULATE_RANKING_SUCCESS,
    props<{ ranking: number }>()
);

export const calculateRankingError = createAction(
    RetrieveRankingsActions.CALCULATE_RANKING_ERROR,
    props<{ error: any }>()
);

