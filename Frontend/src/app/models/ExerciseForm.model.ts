export interface ExerciseForm {
    exerciseNumber: number;
    isSubmitted: boolean;
    answers: AnswersForm[];
}

export interface AnswersForm {
    value: number;
    isCorrect: boolean;
}