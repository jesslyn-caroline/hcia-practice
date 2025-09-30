function confirmPasswordValidator(password: string, confirmPassword: string):string {
    let err:string = ""

    if (confirmPassword === "") err = "Confirm Password is required."
    else if (confirmPassword !== password) err = "Passwords do not match."

    return err
}

export default confirmPasswordValidator