import { useState } from "react";
import { useNavigate } from "react-router";

import userIdValidator from "../validators/userId_validator";
import passwordValidator from "../validators/password_validator";
import auth from "../api/login";
import type { UserModel } from "../model/user_model";

function useLogin() {
    const navigate = useNavigate()

    const [userId, setUserId] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>):void => setUserId(e.target.value)
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>):void => setPassword(e.target.value)

    const [userIdErrMsg, setUserIdErrMsg] = useState<string>("")
    const [passwordErrMsg, setPasswordErrMsg] = useState<string>("")

    const [isOnLoad, setIsOnLoad] = useState<boolean>(false)

    const login = async () => {
        let userIdValid = userIdValidator(userId)
        let passwordValid = passwordValidator(password)

        setUserIdErrMsg(userIdValid)
        setPasswordErrMsg(passwordValid)

        if (userIdValid === "" && passwordValid === "") {
            setIsOnLoad(true)
            let user:UserModel | false = await auth(userId, password)
            setIsOnLoad(false)

            if (user) {
                setTimeout(() => {
                    navigate("/")
                }, 3000)
            }
        }
    }



    return { 
        userId, 
        password, 
        isOnLoad, 
        handleUserIdChange, 
        handlePasswordChange,
        userIdErrMsg, 
        passwordErrMsg,
        login
    };
}

export default useLogin