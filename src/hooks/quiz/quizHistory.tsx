import { useContext, useEffect, useState } from "react"
import type HistoryModel from "../../model/history_model"
import { UserContext } from "../../providers/user_provider"
import getQuizHistory from "../../api/quiz/getQuizHistory"

function quizHistory() {
    const { user } = useContext(UserContext)

    const [history, setHistory] = useState<HistoryModel[]>([])

    useEffect(() => {
        fetchHistory()
    }, [])

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    async function fetchHistory() { 
        setIsOnLoad(true)
        setHistory(await getQuizHistory(user.userId))
        setIsOnLoad(false)
    }

    return {history, isOnLoad}
}

export default quizHistory