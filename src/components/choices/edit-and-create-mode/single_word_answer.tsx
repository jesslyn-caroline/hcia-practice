interface Props {
    handleOptionValueChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
    optionsValue: string[]
    optionsErrMessage: string[]
}

function SingleWordAnswer({handleOptionValueChange, optionsValue, optionsErrMessage} : Props) {

    return (
        <div className={`flex flex-row space-x-4 items-center`}>
            <h3 className={`text-sm font-semibold`}>Answer: </h3>
            <div className={`flex flex-col relative`}>
                <input type="text" onChange={(e) => {handleOptionValueChange(0, e)}}  className={`w-full text-sm py-2 outline-none border-b-2 border-accent-2`} placeholder="Enter Answer" value={optionsValue[0]}/>
                <span className={`${optionsErrMessage[0] === "" ? "hidden" : ""}`}>
                    <div className={`absolute text-xs text-red-500 mt-1`}>{optionsErrMessage[0]}</div>
                </span>
            </div>
        </div>
    )
}

export default SingleWordAnswer