import { Link } from "react-router"

import useLogin from "../hooks/login"
import InputField from "../components/field/input_field"
import ActionButton from "../components/button/action_button"

function Login() {

    const { 
        userId, password, isOnLoad, handleUserIdChange, handlePasswordChange, userIdErrMsg, passwordErrMsg, login
    } = useLogin()

    return(
    <div className={`w-full h-full flex justify-center pt-14`}>
        <div className={`max-w-[400px] w-full h-fit border rounded-xl border-accent-2 py-8 px-6 lg:px-10 flex flex-col items-center`}>
            <h1 className={`text-lg font-semibold`}>Log In</h1>
            <div className={`w-full mt-10 flex flex-col space-y-8`}>
                <InputField handleInputChange={handleUserIdChange} 
                    inputType="text"
                    errMessage={userIdErrMsg} 
                    placeholderValue={"Admin ID / Student ID"} 
                    idValue={"userId"} 
                    labelValue={"User ID"}
                    value={userId} />
                <InputField handleInputChange={handlePasswordChange} 
                    inputType="password"
                    errMessage={passwordErrMsg} 
                    placeholderValue={"Enter your password"} 
                    idValue={"password"} 
                    labelValue={"Password"}
                    value={password} />
                <ActionButton action={login} 
                    text={"Log In"} icon={""} isOnLoad={isOnLoad} />
            </div>
            <div className={`w-full mt-6`}>
                <h3>
                    Don't have an account? <Link to="/signup" className={`text-blue-600 underline`}>Sign up</Link>
                </h3>
            </div>
        </div>
    </div>  
    )
}

export default Login