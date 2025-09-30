import postQuestion from "../../api/question/postQuestion"
import optionValidator from "../../validators/option_validator"
import questionValidator from "../../validators/question_validator"
import scoreValidator from "../../validators/score_validator"
import yearValidator from "../../validators/year_validator"
import useQuestion from "./useQuestion"

function saveQuestion() {
    const {
        typeOptions,
        type, handleTypeChange,
        year, handleYearChange,
        score, handleScoreChange,
        question, handleQuestionChange,
        optionsValue, handleOptionValueChange,
        isOptionsSelected, handleIsOptionsSelectedChange,
        isOnLoad, setIsOnLoad,
        yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
        setYearErrMessage, setScoreErrMessage, setQuestionErrMessage, setNoAnswerErrMessage, setOptionsErrMessage,
    } = useQuestion()

    async function saveQ():Promise<void> {
        let yearValid:string = yearValidator(year.toString())
        let scoreValid:string = scoreValidator(score)
        let questionValid:string = questionValidator(question)
        let noAnswer:string = optionValidator(type, isOptionsSelected, optionsValue).noAnswerErrMessage
        let optionValid:string[] = optionValidator(type, isOptionsSelected, optionsValue).optionsErrMessage

        setYearErrMessage(yearValid)
        setScoreErrMessage(scoreValid)
        setQuestionErrMessage(questionValid)
        setNoAnswerErrMessage(noAnswer)
        setOptionsErrMessage(optionValid)

        if (yearValid !== "" || scoreValid !== "" || questionValid !== "" || noAnswer !== "") return
        for (let i = 0; i < 4; i++) {
            if (optionValid[i] !== "") return
        }

        setIsOnLoad(true)

        let answer:string[] = []
        for (let i = 0; i < 4; i++) {
            if (isOptionsSelected[i]) answer.push(optionsValue[i])
        }

        setIsOnLoad(true)
        await postQuestion({question, year, type, score, answer, optionsValue})
        setIsOnLoad(false)
    }

    return {
        saveQ, typeOptions,
        type, handleTypeChange,
        year, handleYearChange,
        score, handleScoreChange,
        question, handleQuestionChange,
        optionsValue, handleOptionValueChange,
        isOptionsSelected, handleIsOptionsSelectedChange,
        isOnLoad,
        yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
    }
}

export default saveQuestion