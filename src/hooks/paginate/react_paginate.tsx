import { useState } from "react"
import type { QuestionModel } from "../../model/question_model"

function reactPaginate_ (filteredItems:QuestionModel[], items:QuestionModel[]) {
    const itemsPerPage:number = 20
    const [startOffset, setStartOffset] = useState<number>(0)

    const endOffset:number = startOffset + itemsPerPage
    const currentItems:QuestionModel[] = filteredItems.slice(startOffset, endOffset)
    const pageCount:number = Math.ceil(items.length / itemsPerPage)

    const handlePageClick = (e: {selected: number}) => {
        const newOffset = (e.selected * itemsPerPage) % items.length
        setStartOffset(newOffset)
    }

    return {currentItems, pageCount, handlePageClick, startOffset}
}

export default reactPaginate_