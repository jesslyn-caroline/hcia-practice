import axios from "axios"
import type { QuestionModel } from "../../model/question_model"
import toast_error from "../../components/toast/toast_error"

async function getQuestion({parameter} : {parameter: string}) {
    try {
        const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/question/${parameter}`)
        
        if (response.status === 200) {
            const question:QuestionModel = response.data
            // setYear(question.year.toString())
            // setType(question.type)
            // setScore(question.score)
            // setQuestion(question.question)
            // setOptionsValue(question.options)

            let selectedOption = [false, false, false, false]
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < question.answer.length; j++) {
                    if (question.options[i] === question.answer[j]) {
                        selectedOption[i] = true
                    }
                }
            }
            // setIsOptionsSelected(selectedOption)

            return {...question, selectedOption}
        }
    }
    catch (err: any) {
        toast_error(err.response.data.message)
    }
}

export default getQuestion