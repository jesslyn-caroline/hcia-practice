import { useState } from "react"

function useQuiz(currentQuestion:number) {
    const [isAnswerAttemptSelected, setIsAnswerAttemptSelected] = useState<boolean[][]>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.isAnswerAttemptSelected
    })

    const [answerAttemptValue, setAnswerAttemptValue] = useState<string[][]>(() => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)
        return quizData.answerAttemptValue
    })

    const handleCheckBoxAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!) 
        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleRadioAnswer = (index:number, e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        let newIsAnswerAttemptSelected = [...isAnswerAttemptSelected]
        newIsAnswerAttemptSelected[currentQuestion] = [false, false, false, false]
        newIsAnswerAttemptSelected[currentQuestion][index] = e.target.checked
        setIsAnswerAttemptSelected(newIsAnswerAttemptSelected)

        localStorage.setItem("quizData", JSON.stringify({...quizData, isAnswerAttemptSelected: newIsAnswerAttemptSelected}))
    }

    const handleEssayAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quizData = JSON.parse(localStorage.getItem("quizData")!)

        let newAnswerAttemptValue = [...answerAttemptValue]
        newAnswerAttemptValue[currentQuestion][0] = e.target.value
        setAnswerAttemptValue(newAnswerAttemptValue)

        localStorage.setItem("quizData", JSON.stringify({...quizData, answerAttemptValue: newAnswerAttemptValue}))
    }

    return {isAnswerAttemptSelected, answerAttemptValue, handleCheckBoxAnswer, handleRadioAnswer, handleEssayAnswer}
}

export default useQuiz