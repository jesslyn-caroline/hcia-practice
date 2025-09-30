import { useState } from "react"

function useQuestion () {
    const typeOptions: string[] = ["multiple-answer-multiple-choice", "single-answer-multiple-choice", "true-or-false", "single-word-answer"]
    const date = new Date()

    const [type, setType] = useState<string>(typeOptions[0])
    const [year, setYear] = useState<string>(date.getFullYear().toString())
    const [score, setScore] = useState<number>(0)
    const [question, setQuestion] = useState<string>("")
    const [optionsValue, setOptionsValue] = useState<string[]>(["", "", "", ""])

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value)

        // reset options value and isSelected
        setOptionsValue(["", "", "", ""])
        setIsOptionsSelected([false, false, false, false])
        resetErrMessage()

        if (e.target.value === "single-word-answer") setIsOptionsSelected([true, false, false, false])
        if (e.target.value === "true-or-false") setOptionsValue(["True", "False", "", ""])
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>):void => setYear(e.target.value)
    const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>):void => setScore(parseInt(e.target.value))
    const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>):void => setQuestion(e.target.value)
    const handleOptionValueChange = (index:number, e: React.ChangeEvent<HTMLInputElement>):void => {
        let newOptionsValue = [...optionsValue]
        newOptionsValue[index] = e.target.value

        setOptionsValue(newOptionsValue)
    }

    const [isOptionsSelected, setIsOptionsSelected] = useState<boolean[]>([false, false, false, false])
    const handleIsOptionsSelectedChange = (index:number, e: React.ChangeEvent<HTMLInputElement>):void => {
        let newIsOptionsSelected = [...isOptionsSelected]

        if (type === "multiple-answer-multiple-choice") newIsOptionsSelected[index] = e.target.checked
        else {
            for (let i = 0; i < 4; i++) {
                if (i === index) newIsOptionsSelected[i] = true
                else newIsOptionsSelected[i] = false
            }
        }

        setIsOptionsSelected(newIsOptionsSelected)
    }

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    const [yearErrMessage, setYearErrMessage] = useState<string>("")
    const [scoreErrMessage, setScoreErrMessage] = useState<string>("")
    const [questionErrMessage, setQuestionErrMessage] = useState<string>("")
    const [noAnswerErrMessage, setNoAnswerErrMessage] = useState<string>("")
    const [optionsErrMessage, setOptionsErrMessage] = useState<string[]>(["", "", "", ""])

    const clearInputs = () => {
        setYear(date.getFullYear().toString())
        setType("multiple-answer-multiple-choice")
        setScore(0)
        setQuestion("")
        setOptionsValue(["", "", "", ""])
        setIsOptionsSelected([false, false, false, false])
    }

    const resetErrMessage = () => {
        setYearErrMessage("")
        setScoreErrMessage("")
        setQuestionErrMessage("")
        setNoAnswerErrMessage("")
        setOptionsErrMessage(["", "", "", ""])
    }

    return {
        typeOptions,
        type, handleTypeChange, setType,
        year, handleYearChange, setYear,
        score, handleScoreChange, setScore,
        question, handleQuestionChange, setQuestion,
        optionsValue, handleOptionValueChange, setOptionsValue,
        isOptionsSelected, handleIsOptionsSelectedChange, setIsOptionsSelected,
        isOnLoad, setIsOnLoad,
        yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
        setYearErrMessage, setScoreErrMessage, setQuestionErrMessage, setNoAnswerErrMessage, setOptionsErrMessage,
        clearInputs
    }
}

export default useQuestion