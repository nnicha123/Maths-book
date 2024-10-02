import { createAction, props } from "@ngrx/store";
import { Question } from "../../models/Question.model";

enum CalculateRankingsActions {
    CALCULATE_RANKING = '[Calculate Ranking] Calculate Ranking',
    CALCULATE_RANKING_SUCCESS = '[Calculate Ranking] Calculate Ranking Success',
    CALCULATE_RANKING_ERROR = '[Calculate Ranking] Calculate Ranking Error'
}

export const calculateRanking = createAction(
    CalculateRankingsActions.CALCULATE_RANKING,
    props<{ questions: Question[] }>()
);

export const calculateRankingSuccess = createAction(
    CalculateRankingsActions.CALCULATE_RANKING_SUCCESS,
    props<{ ranking: number }>()
);

export const calculateRankingError = createAction(
    CalculateRankingsActions.CALCULATE_RANKING_ERROR,
    props<{ error: any }>()
);

