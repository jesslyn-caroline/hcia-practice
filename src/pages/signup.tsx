import { Link } from "react-router"

import ActionButton from "../components/button/action_button"
import InputField from "../components/field/input_field"
import useSignup from "../hooks/signup"

function Signup() {

    const {
        studentId, username, password, confirmPassword,
        handleStudentIdChange, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange,
        studentIdErrMsg, usernameErrMsg, passwordErrMsg, confirmPasswordErrMsg,
        getSignup, isOnLoad
    } = useSignup()

    return(
        <div className={`w-full h-full flex justify-center py-14`}>
            <div className={`max-w-[400px] w-full h-fit border rounded-xl border-accent-2 py-8 px-6 lg:px-10 flex flex-col items-center`}>
                <h1 className={`text-lg text-text font-semibold`}>Create Account</h1>
                <div className={`w-full mt-8 flex flex-col space-y-8`}>
                    <InputField handleInputChange={handleStudentIdChange} 
                        inputType="text"
                        errMessage={studentIdErrMsg} 
                        placeholderValue={"Enter your Student ID"} 
                        idValue={"userId"} 
                        labelValue={"Student ID"}
                        value={studentId} />
                    <InputField handleInputChange={handleUsernameChange} 
                        inputType="text"
                        errMessage={usernameErrMsg} 
                        placeholderValue={"Enter your name"} 
                        idValue={"studentName"}
                        labelValue="Name"
                        value={username} />
                    <InputField handleInputChange={handlePasswordChange} 
                        inputType="password"
                        errMessage={passwordErrMsg} 
                        placeholderValue={"Enter your password"} 
                        idValue={"password"}
                        labelValue="Password"
                        value={password} />
                    <InputField handleInputChange={handleConfirmPasswordChange}
                        inputType="password"
                        errMessage={confirmPasswordErrMsg}
                        placeholderValue={"Confirm your password"}
                        idValue={"confirmPassword"}
                        labelValue="Confirm Password"
                        value={confirmPassword} />
                    <ActionButton action={getSignup} 
                        text={"Sign Up"} icon={""} isOnLoad={isOnLoad} />
                </div>
                <div className={`w-full mt-6`}>
                    <h3>Already have account? <Link to="/login" className={`text-blue-600 underline`}>Log In</Link></h3>
                </div>
            </div>
        </div>
    )
}

export default Signup