function getTimeLeft(quizData:any):number {

    const expectedEndTime = new Date(quizData.expectedEndTime)
    const currentTime = new Date()

    let seconds = Math.ceil((expectedEndTime.getTime() - currentTime.getTime()) / 1000)

    return seconds
}

export default getTimeLeft