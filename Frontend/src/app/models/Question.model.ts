export interface Question extends QuestionAPI {
    correctAnswer: number;
}

export interface QuestionAPI {
    questionId: number;
    questionNumber: number;
    exerciseId: number;
    exerciseNumber: number;
    currentAnswer: number;
    isCorrect: boolean;
}
