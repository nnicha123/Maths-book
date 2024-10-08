import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './submit-exercise.action';
import { map, switchMap, withLatestFrom } from "rxjs";
import { ExerciseService } from "../../services/exercises/exercises.service";
import {  ExerciseForm } from "../../models/ExerciseForm.model";
import { ExerciseAPI } from "../../models/Exercise.model";
import { calculateScore, fetchCorrectAnswerRaw, getIsCorrect } from "../utils";
import { Question } from "../../models/Question.model";
import * as fromSelectors from '../module.selector';
import { ModuleEntityState } from "../definitions/store.definitions";
import { select, Store } from "@ngrx/store";
import { Answer } from "../../models/Answer.model";

@Injectable()
export class SubmitExerciseEffect {
    constructor(
        private actions$: Actions,
        private exerciseService: ExerciseService,
        private store: Store<{ module: ModuleEntityState }>) { }

    submitExercise$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fromActions.submitExercise),
            withLatestFrom(
                this.store.pipe(select(fromSelectors.selectUserId)),
                this.store.pipe(select(fromSelectors.selectAllAnswers))
            ),
            switchMap(([action, userId, answers]) => {
                const exercise = formToApi(userId, action.exercise, answers);
                return this.exerciseService.submitExercise(exercise).pipe(
                    map((questions: Question[]) => fromActions.submitExerciseSuccess({ questions,userId }))
                )
            })
        ),
    )
}

function formToApi(userId: number, exerciseForm: ExerciseForm, answers: Answer[]): ExerciseAPI {
    const returnedExercise: ExerciseAPI = {
        exerciseId: exerciseForm.exerciseId,
        userId: userId,
        exerciseNumber: exerciseForm.exerciseNumber,
        // Default submited to true
        submitted: true,
        // default score first, have a function to determine this later (need set of answers to compare to each exercise)
        score: 100,
        // update isCorrect on submit as well & calculate new score 
        questions: exerciseForm.answers.map((answer) => {
            const correctAnswer = fetchCorrectAnswerRaw(answer.questionNumber, exerciseForm.exerciseNumber,answers)
            return {
                questionId: answer.questionId,
                questionNumber: answer.questionNumber,
                exerciseId: exerciseForm.exerciseId,
                exerciseNumber: exerciseForm.exerciseNumber,
                currentAnswer: answer.value,
                isCorrect: getIsCorrect(answer.value, correctAnswer),
            }
        })

    }
    returnedExercise.score = calculateScore(returnedExercise.questions);
    return returnedExercise;
}
