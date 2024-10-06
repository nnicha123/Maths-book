export interface ExerciseForm {
    exerciseId: number;
    exerciseNumber: number;
    isSubmitted: boolean;
    answers: AnswersForm[];
}

export interface AnswersForm {
    questionId: number;
    questionNumber: number;
    value: number;
    correctValue: number;
    isCorrect: boolean;
}