import { useContext, useEffect, useState } from "react"
import getTimeToNext from "../../utils/getTimeToNext"
import type { QuestionModel } from "../../model/question_model"
import checkAnswer from "../../utils/check_answer"
import postResult from "../../api/quiz/postResult"
import { UserContext } from "../../providers/user_provider"
import useQuiz from "./useQuiz"
import { useNavigate } from "react-router"

function quizFlash () {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const question:QuestionModel[] = JSON.parse(localStorage.getItem("quizData")!).question

    const [timeToNext, setTimeToNext] = useState<number>(() => { return getTimeToNext() })

    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        
        const startTime = new Date(quizData.startTime).getTime()
        const currentTime = new Date().getTime()
        const diff = Math.floor((currentTime - startTime) / 1000)
        const currentQuestion = Math.floor(diff / quizData.timePerQuestion)

        return Math.max(currentQuestion, quizData.currentQuestion)
    })

    const {isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer} = useQuiz(currentQuestion);


    useEffect(() => {
        setInterval(() => {
            let time = getTimeToNext()
            setTimeToNext(time)
        }, 1000)
    }, [])

    useEffect(() => {
        if (timeToNext === 0) {
            const quizData = JSON.parse(localStorage.getItem("quizData")!)

            if (currentQuestion === question.length - 1) {
                postResult(score, user.userId)
                localStorage.removeItem("quizData")
                navigate(`/quiz/result/${quizData.quizId}`)

                return
            }

            let nextLowerBound = new Date(new Date(quizData.lowerBoundQuizTime).getTime() + quizData.timePerQuestion * 1000)
            localStorage.setItem("quizData", JSON.stringify({...quizData, lowerBoundQuizTime: nextLowerBound, currentQuestion: currentQuestion + 1}))
            setCurrentQuestion(JSON.parse(localStorage.getItem("quizData")!).currentQuestion)
        }
    }, [timeToNext])

    const [score, setScore] = useState<number>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.score
    })

    function submit() {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        const current = new Date().getTime()
        const lowerBound = new Date(current - quizData.timePerQuestion * 1000)

        setTimeToNext(0)

        let isCorrect:boolean = checkAnswer(question[currentQuestion].answer, isAnswerAttemptSelected[currentQuestion], question[currentQuestion].options)
        if (question[currentQuestion].type === "single-word-answer") isCorrect = answerAttemptValue[currentQuestion][0].toLowerCase() === question[currentQuestion].answer[0].toLowerCase()

        let newScore = quizData.score
        if (isCorrect) {
            newScore = quizData.score + question[currentQuestion].score
            setScore(newScore)
        }

        localStorage.setItem("quizData", JSON.stringify({
            ...quizData,
            lowerBoundQuizTime: lowerBound,
            score: newScore, 
        }))
    }

    return { currentQuestion, question, timeToNext,  isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, score, submit }
}

export default quizFlash