function scoreValidator (score: number):string {
    let err:string = ""

    if (isNaN(score!) || score === undefined) err = "Score is required."
    else if (score < 0) err = "Score cannot be negative."

    return err
}

export default scoreValidator