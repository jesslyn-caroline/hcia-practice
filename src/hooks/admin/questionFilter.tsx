import { useState } from "react"
import type { QuestionModel } from "../../model/question_model"

function questionFilter(questionList: QuestionModel[]) {
    const [filteredQuestionList, setFilteredQuestionList] = useState<QuestionModel[]>([])

    const [questionSearch, setQuestionSearch] = useState<string>("")
    const [yearSearch, setYearSearch] = useState<string>("")
    const [typeSearch, setTypeSearch] = useState<string>("")

    const handleQuestionSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuestionSearch(e.target.value)
    const handleYearSearch = (e: React.ChangeEvent<HTMLInputElement>) => setYearSearch(e.target.value)
    const handleTypeSearch = (e: React.ChangeEvent<HTMLSelectElement>) => setTypeSearch(e.target.value)

    function search():void {
        let filterArr = questionList.filter((item: QuestionModel) => {
            return item.question.toLowerCase().includes(questionSearch.toLowerCase()) && 
                (item.year.toString() === yearSearch || yearSearch === "") && 
                (item.type === typeSearch || typeSearch === "")
        })

        setFilteredQuestionList(filterArr)
    }

    return { filteredQuestionList, setFilteredQuestionList, questionSearch, yearSearch, typeSearch, handleQuestionSearch, handleYearSearch, handleTypeSearch, search }
}

export default questionFilter