function passwordValidator(password: string):string {
    let err:string = ""

    if (password === "") err = "Password is required.";
    else if (password.length < 8) err = "Password must be at least 8 characters long.";

    return err
}

export default passwordValidator