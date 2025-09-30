import axios from "axios"
import toast_error from "../components/toast/toast_error"
import toast_success from "../components/toast/toast_success"
import type { UserModel } from "../model/user_model"

async function auth(userId: string, password: string): Promise<UserModel | false> {
    try {
        const response = await axios.post(`https://huawei-practice-web-backend.vercel.app/api/user/login`, {userId, password})

        if (response.status === 200) {
            toast_success(response.data.message)
        }
        return response.data.user
    }
    catch (err:any) {
        toast_error(err.response.data.message)

        return false
    }

}

export default auth