import { useEffect, useState } from "react"
import type { QuestionModel } from "../../model/question_model"
import getQuestionList from "../../api/question/getAllQuestions"
import reactPaginate_ from "../paginate/react_paginate"
import deleteQuestion from "../../api/question/deleteQuestion"
import { useNavigate } from "react-router"
import questionFilter from "./questionFilter"

function questionList() {

    const navigate = useNavigate()

    const [questionList, setQuestionList] = useState<QuestionModel[]>([])
    // const [filteredQuestionList, setFilteredQuestionList] = useState<QuestionModel[]>([])

    const { filteredQuestionList, setFilteredQuestionList, questionSearch, yearSearch, typeSearch, handleQuestionSearch, handleYearSearch, handleTypeSearch, search } = questionFilter(questionList)
    const { currentItems, pageCount, handlePageClick, startOffset } = reactPaginate_(filteredQuestionList, questionList)


    const [isOnLoadDelete, setIsOnLoadDelete] = useState<string>("false")

    async function fetch() {
        let questions:QuestionModel[] = await getQuestionList()
        setQuestionList(questions)
        setFilteredQuestionList(questions)
    }

    async function deleteQ(id: string) {
        setIsOnLoadDelete(id)
        await deleteQuestion(id)
        setIsOnLoadDelete(id)
        fetch()
    }

    function edit (id: string) { 
        navigate(`/question/edit/${id}`)
    }


    useEffect(() => {
        fetch()
    }, [isOnLoadDelete])

    return {typeSearch, questionSearch, yearSearch, currentItems, pageCount, handlePageClick, startOffset, handleQuestionSearch, handleYearSearch, handleTypeSearch, isOnLoadDelete, search, deleteQ, edit}
}

export default questionList