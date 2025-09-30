import { useState } from "react"

import { useNavigate } from "react-router"
import postQuiz from "../../api/quiz/postQuiz"
import toast_error from "../../components/toast/toast_error"
import type { QuestionModel } from "../../model/question_model"
import type { QuizFlashModel } from "../../model/quizFlash_model"

function NewQuiz() {
    const navigate = useNavigate()
    const quizTypes  = ["regular", "flash"]

    const [questionCount, setQuestionCount] = useState<number>(10)
    const [quizType, setQuizType] = useState<number>(0)
    const [timePerQuestion, setTimePerQuestion] = useState<number>(10) // seconds
    const [timeLimit, setTimeLimit] = useState<number>(60) // minutes

    const handleQuestionCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        setQuestionCount(count)
    }

    const handleQuizType = (num:number) => setQuizType(num)
    const handleTimePerQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        setTimePerQuestion(count)
    }
    const handleTimeLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let count = parseInt(e.target.value)
        setTimeLimit(count)
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    async function startQuiz():Promise<void> {

        const isOnQuiz = localStorage.getItem("quizData");
        if (isOnQuiz) {

            const end = new Date(JSON.parse(isOnQuiz).expectedEndTime)
            const now = new Date()

            if (now < end) {
                let quiz = JSON.parse(isOnQuiz).quizType
                toast_error("You have a quiz ongoing!");
                setTimeout(() => {
                    navigate(`/quiz/${quiz}/ongoing`) 
                }, 3000)

                return
            }
                
            localStorage.removeItem("quizData")
        }

        setIsOnLoad(true)
        const { questions, quizId } : { questions: QuestionModel[], quizId: string } = await postQuiz({ questionCount, quizType, timeLimit, timePerQuestion })
        setIsOnLoad(false)

        let time: number
        const miliseconds = 1000;

        if (quizType === 1) time = timePerQuestion * questionCount * miliseconds
        else time = timeLimit * 60 * miliseconds

        let isAnswerAttemptSelected: boolean[][] = [
            ...questions.map((value : QuestionModel) => {
                return (value.type === "single-word-answer") ? [true, false, false, false] : [false, false, false, false]
            })
        ]

        let answerAttemptValue: string[][] = [
            ...questions.map((value : QuestionModel) => {
                return (value.type === "single-word-answer") ? [""] : []
            })
        ]

        if (quizType === 0) {
            let quizData = {
                question: questions,
                startTime: new Date(),
                expectedEndTime: new Date(new Date().getTime() + time),
                quizType: quizTypes[quizType],
                isAnswerAttemptSelected: isAnswerAttemptSelected,
                answerAttemptValue: answerAttemptValue,
                currentQuestion: 0,
                quizId: quizId
            }

            localStorage.setItem("quizData", JSON.stringify(quizData))
            // navigate(`/quiz/${quizTypes[quizType]}/ongoing`)
        }

        else {
            let quizData:QuizFlashModel = {
                question: questions,
                startTime: new Date(),
                timePerQuestion: timePerQuestion,
                lowerBoundQuizTime: new Date(),
                quizType: quizTypes[quizType],
                isAnswerAttemptSelected: isAnswerAttemptSelected,
                answerAttemptValue: answerAttemptValue,
                currentQuestion: 0,
                score: 0,
                quizId: quizId
            }

            localStorage.setItem("quizData", JSON.stringify(quizData))
            // navigate(`/quiz/${quizTypes[quizType]}/ongoing`)
        }
        
        navigate(`/quiz/${quizTypes[quizType]}/ongoing`)
    }

    return { questionCount, handleQuestionCountChange, quizType, handleQuizType, timePerQuestion, handleTimePerQuestionChange, timeLimit, handleTimeLimitChange, startQuiz, isOnLoad }
}  

export default NewQuiz