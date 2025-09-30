import { useContext, useEffect, useState } from "react"
import type { QuestionModel } from "../../model/question_model"
import { useParams } from "react-router"
import { UserContext } from "../../providers/user_provider"
import getHistory from "../../api/quiz/getHistory"
import getQuiz from "../../api/quiz/getQuiz"

function quizResult() {
    const { quizId } = useParams()
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetchHistory()
        getQuizInfo()
    }, [])

    async function fetchHistory() { setScore(await getHistory(quizId!, user.userId)) }
    async function getQuizInfo() { setQuestions(await getQuiz(quizId!)) }

    const [score, setScore] = useState<number>(0)
    const [questions, setQuestions] = useState<QuestionModel[]>([])

    return { quizId, score, questions }
}

export default quizResult