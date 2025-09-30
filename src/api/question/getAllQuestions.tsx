import axios from "axios"
import type { QuestionModel } from "../../model/question_model"

async function getQuestionList():Promise<QuestionModel[]> {
    let questions:QuestionModel[] = []

    try {
        const response = await axios.get("https://huawei-practice-web-backend.vercel.app/api/question")
        
        if (response.status === 200) {
            questions = response.data
        }
    }
    catch (err: any) {
        console.log(err)
    }

    return questions
}

export default getQuestionList