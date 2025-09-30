function studentIdValidator(studentId: string):string {
    let err = ""

    if (studentId === "") err = "User ID is required."
    else if (studentId.length !== 9) err = "User ID must be 9 characters long."

    return err
}

export default studentIdValidator