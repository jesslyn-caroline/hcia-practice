import axios from "axios"
import type HistoryModel from "../../model/history_model"

async function getQuizHistory(userId: string):Promise<HistoryModel[]> {
    let hist:HistoryModel[] = []

    try {
        const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?userId=${userId}`)

        if (response.status === 200) {

            for (let i = 0; i < response.data.length; i++) {
                const quiz = await getQuizInfo(response.data[i].quizId)
                let quizObj:HistoryModel = {
                    time : quiz.time,
                    type : quiz.type,
                    score : response.data[i].score,
                    _id : response.data[i]._id,
                    quizId : response.data[i].quizId
                }
                hist.push(quizObj)
            }

        }
    }
    catch (err: any) {
        console.log(err)
    }

    return hist
}

async function getQuizInfo(quizId: string):Promise<any> {
    try {
        const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizId}`)

        if (response.status === 200) {
            return response.data.quiz
        }
    }
    catch (err: any) {
        console.log(err)
    }
}

export default getQuizHistory