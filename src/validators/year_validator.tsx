function yearValidator(year:string):string {
    let err:string = ""

    if (year === "") err = "Year is required."
    else if (year.length !== 4) err = "Enter a valid year."
    else if (year[0].toUpperCase() !== year[0].toLowerCase() ||
        year[1].toUpperCase() !== year[1].toLowerCase() ||
        year[2].toUpperCase() !== year[2].toLowerCase() ||
        year[3].toUpperCase() !== year[3].toLowerCase()) {
        err = "Enter a valid year."
    }

    return err
}

export default yearValidator