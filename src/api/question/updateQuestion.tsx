import axios from "axios"
import toast_error from "../../components/toast/toast_error"
import toast_success from "../../components/toast/toast_success"

interface Props {
    question: string,
    year: string,
    type: string,
    score: number,
    answer: string[],
    optionsValue: string[],
    id: string
}

async function updateQuestion({question, year, type, score, answer, optionsValue, id} : Props):Promise<boolean> {
    let isUpdated:boolean = false
    try {
        const response = await axios.put(`https://huawei-practice-web-backend.vercel.app/api/question/${id}`, 
            {question, year: parseInt(year), type, score, answer, options: optionsValue}
        )
        
        if (response.status === 200) {
            toast_success(response.data.message)
            isUpdated = true
        }
    }
    catch (err: any) {
        toast_error(err.response.data.message)
    }

    return isUpdated
}

export default updateQuestion