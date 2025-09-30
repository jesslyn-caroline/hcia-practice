import axios from "axios"
import toast_success from "../../components/toast/toast_success"
import toast_error from "../../components/toast/toast_error"

interface Props {
    question: string
    year: string
    type: string
    score: number
    answer: string[]
    optionsValue: string[]
}

async function postQuestion({question, year, type, score, answer, optionsValue} : Props):Promise<void> {
    try {
        const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/question", 
            {question, year: parseInt(year), type, score, answer, options: optionsValue}
        )
        
        if (response.status === 201) {
            toast_success(response.data.message)
        }
    }
    catch (err: any) {
        toast_error(err.response.data.message)
    }
}

export default postQuestion