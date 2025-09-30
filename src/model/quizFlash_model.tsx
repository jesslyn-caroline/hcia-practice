import type { QuestionModel } from "./question_model";

export interface QuizFlashModel {
    question: QuestionModel[],
    startTime: Date,
    timePerQuestion: number,
    lowerBoundQuizTime: Date,
    quizType: string,
    isAnswerAttemptSelected: boolean[][],
    answerAttemptValue: string[][],
    currentQuestion: number,
    score: number,
    quizId: string
}