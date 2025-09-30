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
        initInfo()
    }, [])

    const [score, setScore] = useState<number>(0)
    const [questions, setQuestions] = useState<QuestionModel[]>([])

    async function initInfo() { 
        let questionsVal = await getQuiz(quizId!)
        setQuestions(questionsVal)
        let scoreVal = await getHistory(quizId!, user.userId)
        setScore(scoreVal)
    }

    

    return { quizId, score, questions }
}

export default quizResult