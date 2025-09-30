import axios from "axios"
import type { QuestionModel } from "../../model/question_model"

async function getQuiz(quizId: string):Promise<QuestionModel[]> {
    let data: QuestionModel[] = []

    try {
        const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizId}`)

        if (response.status === 200) {
            data = response.data.quiz.questions
        }
    }
    catch (err: any) {
        console.log(err)
    }

    return data
}

export default getQuiz