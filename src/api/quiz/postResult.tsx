import axios from "axios"
import toast_success from "../../components/toast/toast_success"

async function postResult(score: number, userId: string):Promise<void> {
    const quizData = JSON.parse(localStorage.getItem("quizData")!) 

    try {
        const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/quiz/${quizData.quizId}`, {
            score, userId
        })
        
        if (response.status === 200) {
            toast_success(response.data.message)
            // localStorage.removeItem("quizData")
            // navigate(`/quiz/result/${quizData.quizId}`)              
        }        
    } catch (err) {
        console.error(err)
    }
}

export default postResult