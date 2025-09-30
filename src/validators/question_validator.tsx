function questionValidator(question:string) {
    let err:string = ""

    if (question === "") err = "Question is required."

    return err
}

export default questionValidator