import axios from "axios"

async function getHistory(quizId: string, userId: string):Promise<number> {
    try {
        const response = await axios.get(`https://huawei-practice-web-backend.vercel.app/api/quiz?quizId=${quizId}&userId=${userId}`)

        if (response.status === 200) {
            return response.data[0].score
        }
    }
    catch (err: any) {
        console.log(err)
    }

    return 0
}

export default getHistory