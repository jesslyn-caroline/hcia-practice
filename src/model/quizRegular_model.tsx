import type { QuestionModel } from "./question_model"

export default interface QuizRegularModel {
    question: QuestionModel[],
    startTime: Date,
    expectedEndTime: Date,
    quizType: string,
    isAnswerAttemptSelected: boolean[][]
    answerAttemptValue: string[][],
    currentQuestion: number,
    quizId: string
}