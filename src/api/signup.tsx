import axios from "axios"
import toast_error from "../components/toast/toast_error"
import toast_success from "../components/toast/toast_success"

async function signUp(studentId: string, username: string, password: string):Promise<void> {
    try {
        const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/user/signup", 
            { userId : studentId, username, password, role: "student"} )

        if (response.status === 201) {
            toast_success(response.data.message)
        }
    }
    catch (err:any) {
        toast_error(err.response.data.message)
    }
}

export default signUp