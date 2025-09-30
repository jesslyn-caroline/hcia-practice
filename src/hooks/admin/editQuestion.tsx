import { useParams } from "react-router";
import useQuestion from "./useQuestion";

import getQuestion from "../../api/question/getQuestion";
import updateQuestion from "../../api/question/updateQuestion";

function editQuestion() {
    const {
        typeOptions,
        type, handleTypeChange, setType,
        year, handleYearChange, setYear,
        score, handleScoreChange, setScore,
        question, handleQuestionChange, setQuestion,
        optionsValue, handleOptionValueChange, setOptionsValue,
        isOptionsSelected, handleIsOptionsSelectedChange, setIsOptionsSelected,
        isOnLoad, setIsOnLoad,
        yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
        clearInputs
    } = useQuestion()

    async function fetch():Promise<void> {
        let question = await getQuestion({parameter: params.id!})
        if (question === undefined) return

        setYear(question.year.toString())
        setType(question.type)
        setScore(question.score)
        setQuestion(question.question)
        setOptionsValue(question.options)
        setIsOptionsSelected(question.selectedOption)
    }

    async function update() {
        let answer:string[] = []

        for (let i = 0; i < 4; i++) {
            if (isOptionsSelected[i]) answer.push(optionsValue[i])
        }

        setIsOnLoad(true)
        let isUpdated = await updateQuestion({question, year, type, score, answer, optionsValue, id: params.id!})
        setIsOnLoad(false)

        if (isUpdated) {
            clearInputs()
        }
    }

    const params = useParams()

    return {
        typeOptions,
        type, handleTypeChange,
        year, handleYearChange,
        score, handleScoreChange,
        question, handleQuestionChange,
        optionsValue, handleOptionValueChange,
        isOptionsSelected, handleIsOptionsSelectedChange,
        isOnLoad,
        yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
        clearInputs, fetch, update
    }
}

export default editQuestion