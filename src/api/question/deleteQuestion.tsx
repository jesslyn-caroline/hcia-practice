import axios from "axios"
import toast_error from "../../components/toast/toast_error"
import toast_success from "../../components/toast/toast_success"

async function deleteQuestion(id: string) {
    try {
        const response = await axios.delete(`https://huawei-practice-web-backend.vercel.app/api/question/${id}`)

        if (response.status === 200) {
            toast_success(response.data.message)
        }
    }
    catch (err: any) {
        toast_error(err.response.data.message)
    }
}

export default deleteQuestion