import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../providers/user_provider"
import { useNavigate } from "react-router"
import type { QuestionModel } from "../../model/question_model"
import checkAnswer from "../../utils/check_answer"
import postResult from "../../api/quiz/postResult"
import useQuiz from "./useQuiz"

function quizRegular() {

    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const quizData = JSON.parse(localStorage.getItem("quizData")!) || []

    const [timeLeft, setTimeLeft] = useState<number>(() => getTimeLeft())
    useEffect(() => {
        setInterval(() => 
            setTimeLeft(getTimeLeft())
        , 1000)
    }, [])

    const question:QuestionModel[] = quizData.question

    function getTimeLeft():number {

        const expectedEndTime = new Date(quizData.expectedEndTime)
        const currentTime = new Date()

        let seconds = Math.ceil((expectedEndTime.getTime() - currentTime.getTime()) / 1000)

        if (seconds == 0) submit()
        return seconds
    }

    const [currentQuestion, setCurrentQuestion] = useState<number>(() => {
        return quizData.currentQuestion
    })

    const handleCurrentQuestionChange = (num:number) => {
        if (num < 0 || num >= question.length) return
        localStorage.setItem("quizData", JSON.stringify({...quizData, currentQuestion: num}))
        setCurrentQuestion(num)
    }

    const {isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer} = useQuiz(currentQuestion);


    function submit():void {
        let score = 0

        for (let i = 0; i < question.length; i++) {
            let isCorrect:boolean = checkAnswer(question[i].answer, isAnswerAttemptSelected[i], question[i].options)
            if (question[i].type === "single-word-answer") isCorrect = answerAttemptValue[i][0].toLowerCase() === question[i].answer[0].toLowerCase()

            if (isCorrect) score += question[i].score
        }

       postResult(score, user.userId)
       navigate(`/quiz/result/${quizData.quizId}`)
       localStorage.removeItem("quizData")
    }

    return {timeLeft, question, currentQuestion, answerAttemptValue, handleCurrentQuestionChange, isAnswerAttemptSelected, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer, submit}
}

export default quizRegular