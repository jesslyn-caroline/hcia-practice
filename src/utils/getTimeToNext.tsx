function getTimeToNext():number {
    const quizData = JSON.parse(localStorage.getItem("quizData")!)

    const lowerBound = new Date(quizData.lowerBoundQuizTime).getTime()
    let current = new Date().getTime()

    let diff = Math.floor((current - lowerBound) / 1000)
    const secondsLeft = quizData.timePerQuestion - (diff % quizData.timePerQuestion)
    localStorage.setItem("quizData", JSON.stringify({...quizData, timeToNext: secondsLeft}))

    return secondsLeft - 1
}

export default getTimeToNext