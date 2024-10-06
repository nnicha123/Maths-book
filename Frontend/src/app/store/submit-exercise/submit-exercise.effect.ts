import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromActions from './submit-exercise.action';
import { map, switchMap, withLatestFrom } from "rxjs";
import { ExerciseService } from "../../services/exercises/exercises.service";
import { AnswersForm, ExerciseForm } from "../../models/ExerciseForm.model";
import { Exercise } from "../../models/Exercise.model";
import { calculateScore } from "../utils";
import { Question } from "../../models/Question.model";
import * as fromSelectors from '../module.selector';
import { ModuleEntityState } from "../definitions/store.definitions";
import { select, Store } from "@ngrx/store";

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
            ),
            switchMap(([action, userId]) => {
                const exercise = formToApi(userId, action.exercise);
                return this.exerciseService.submitExercise(exercise).pipe(
                    map((questions: Question[]) => fromActions.submitExerciseSuccess({ questions }))
                )
            })
        )
    )
}

function formToApi(userId: number, exerciseForm: ExerciseForm): Exercise {
    const returnedExercise: Exercise = {
        exerciseId: exerciseForm.exerciseId,
        userId: userId,
        exerciseNumber: exerciseForm.exerciseNumber,
        submitted: exerciseForm.isSubmitted,
        // default score first, have a function to determine this later (need set of answers to compare to each exercise)
        score: 100,
        // update isCorrect on submit as well & calculate new score 
        questions: exerciseForm.answers.map((answer) => {
            return {
                questionId: answer.questionId,
                questionNumber: answer.questionNumber,
                exerciseId: exerciseForm.exerciseId,
                exerciseNumber: exerciseForm.exerciseNumber,
                currentAnswer: answer.value,
                correctAnswer: answer.correctValue,
                isCorrect: isAnswerCorrect(answer)
            }
        })

    }
    returnedExercise.score = calculateScore(returnedExercise.questions);
    return returnedExercise;
}

function isAnswerCorrect(answer: AnswersForm) {
    return answer.value === answer.correctValue;
}
