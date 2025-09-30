import ReactPaginate from "react-paginate"

interface Props {
    handlePageClick: (e: { selected: number; }) => void;
    pageCount: number;
}
  

function ReactPaginate_({handlePageClick, pageCount}: Props) {

    return (
    <ReactPaginate
        previousLabel={<i className="ri-arrow-left-s-line"/>}
        breakLabel="..."
        nextLabel={<i className="ri-arrow-right-s-line"/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        className="flex flex-row justify-center items-center"
        pageClassName="border-1 border-accent-2 w-8 h-8 flex justify-center items-center"
        breakClassName="border-1 border-accent-2 w-8 h-8 flex justify-center items-center" 
        previousClassName="text-2xl w-8 h-8 flex justify-center items-center"
        nextClassName="text-2xl w-8 h-8 flex justify-center items-center"
        activeClassName="text-blue-600 font-medium bg-gray-200"                   
    />
    )
}

export default ReactPaginate_