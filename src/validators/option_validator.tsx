function optionValidator(type:string, isOptionsSelected:boolean[], optionsValue:string[]) {
    let noAnswerErrMessage:string = ""

    let optionsErrMessage:string[] = ["", "", "", ""]
    let isNoAnswer = true

    if (type === "single-word-answer") {
        isNoAnswer = false
        if (optionsValue[0] === "") optionsErrMessage[0] = "Please fill the option"
    }
    else if (type === "true-or-false") {
        if (!isOptionsSelected[0] && !isOptionsSelected[1]) isNoAnswer = false
        else isNoAnswer = true
    }
    else {
        for (let i = 0; i < 4; i++) {
            if (optionsValue[i] === "") {
                optionsErrMessage[i] = "Please fill the option"
            }
            else optionsErrMessage[i] = ""

            if (isOptionsSelected[i]) isNoAnswer = false
        }
    }


    if (isNoAnswer) noAnswerErrMessage = "Please select the answer"

    return {
        noAnswerErrMessage,
        optionsErrMessage
    }
}

export default optionValidator