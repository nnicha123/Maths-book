export interface ExerciseForm {
    exerciseId: number;
    exerciseNumber: number;
    isSubmitted: boolean;
    answers: AnswersForm[];
}

export interface AnswersForm {
    value: number;
    isCorrect: boolean;
}