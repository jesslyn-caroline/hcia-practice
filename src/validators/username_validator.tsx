function usernameValidator(username:string):string {
    let err:string = ""

    if (username.trim() === "") err = "Username is required."

    return err
}

export default usernameValidator