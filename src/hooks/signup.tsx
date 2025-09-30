import { useState } from "react"
import { useNavigate } from "react-router"

import signUp from "../api/signup"
import studentIdValidator from "../validators/studentId_validator"
import usernameValidator from "../validators/username_validator"
import passwordValidator from "../validators/password_validator"
import confirmPasswordValidator from "../validators/confirmPassword"

function useSignup() {

    const navigate = useNavigate()

    const [studentId, setStudentId] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [studentIdErrMsg, setStudentIdErrMsg] = useState<string>("")
    const [usernameErrMsg, setUsernameErrMsg] = useState<string>("")
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>("")
    const [confirmPasswordErrMsg, setConfirmPasswordErrMsg] = useState<string>("")

    const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setStudentId(e.target.value)
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUsername(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => setConfirmPassword(e.target.value)
    
    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    const getSignup = async () => {
        let studentIdValid = studentIdValidator(studentId)
        let usernameValid = usernameValidator(username)
        let passwordValid = passwordValidator(password)
        let confirmPasswordValid = confirmPasswordValidator(password, confirmPassword)

        setStudentIdErrMsg(studentIdValid)
        setUsernameErrMsg(usernameValid)
        setPasswordErrMsg(passwordValid)
        setConfirmPasswordErrMsg(confirmPasswordValid)

        if (studentIdValid === "" && usernameValid === "" && passwordValid === "" && confirmPasswordValid === "") {
            setIsOnLoad(true)
            await signUp(studentId, username, password)
            setIsOnLoad(false)

            setTimeout(() => {
                navigate("/login")
            }, 3000)
        }
    }

    return {
        studentId, username, password, confirmPassword,
        handleStudentIdChange, handleUsernameChange, handlePasswordChange, handleConfirmPasswordChange,
        studentIdErrMsg, usernameErrMsg, passwordErrMsg, confirmPasswordErrMsg,
        getSignup, isOnLoad
    }
}

export default useSignup