import SelectField from "../../components/field/select_field"
import InputField from "../../components/field/input_field"
import MultipleAnswerMultipleChoice from "../../components/choices/edit-and-create-mode/multiple_answer_multiple_choice"
import SingleAnswerMultipleChoice from "../../components/choices/edit-and-create-mode/single_answer_multiple_choice"
import SingleWordAnswer from "../../components/choices/edit-and-create-mode/single_word_answer"
import TrueOrFalse from "../../components/choices/edit-and-create-mode/true-or-false"
import ActionButton from "../../components/button/action_button"
import saveQuestion from "../../hooks/admin/saveQuestion"

function CreateQuestion() {
   const {
    saveQ, typeOptions,
    type, handleTypeChange,
    year, handleYearChange,
    score, handleScoreChange,
    question, handleQuestionChange,
    optionsValue, handleOptionValueChange,
    isOptionsSelected, handleIsOptionsSelectedChange,
    isOnLoad,
    yearErrMessage, scoreErrMessage, questionErrMessage, noAnswerErrMessage, optionsErrMessage,
    } = saveQuestion()

    return (
        <div className={`flex flex-col`}>
            <i className={`text-4xl ri-menu-add-line mb-2`}/>
            <h1 className={`text-xl font-semibold mb-8`}>Create Question</h1>
            <div className={`space-y-8`}>
                <div className={`flex flex-col md:flex-row md:space-x-12`}>
                    <div>
                        <SelectField handleSelectChange={handleTypeChange} 
                            optionsValue={typeOptions} 
                            optionsLabel={["Multiple Answers Multiple Choice", "Single Answer Multiple Choice", "True or False", "Single Word Answer"]}
                            labelValue="Question Type" 
                            titleValue="question-type"
                            errMessage=""
                            value={type} />
                    </div>
                    <div className={`flex flex-row space-x-12`}>
                        <InputField handleInputChange={handleYearChange}
                            inputType="text" 
                            errMessage={yearErrMessage} 
                            placeholderValue="YYYY" 
                            idValue="question-year" 
                            labelValue="Year"
                            value={year} />
                        <InputField handleInputChange={handleScoreChange} 
                            inputType="number" 
                            errMessage={scoreErrMessage} 
                            placeholderValue="Score" 
                            idValue="question-score" 
                            labelValue="Score" 
                            value={score} />
                    </div>
                </div>

                <div className={`relative`}>
                    <div className={`font-semibold`}>Question Type</div>
                    <textarea value={question} onChange={handleQuestionChange} rows={4} className={`w-full mt-2 resize-none outline-none p-2 border-2 border-accent-2 rounded-sm`} id="question" placeholder="Enter your question"></textarea>
                    <div className={`${questionErrMessage === "" ? "hidden" : ""} absolute text-xs text-red-500 mt-1`}>{questionErrMessage}</div>
                </div>

                <div>
                    { type === "multiple-answer-multiple-choice"? <MultipleAnswerMultipleChoice handleIsOptionsSelectedChange={handleIsOptionsSelectedChange} handleOptionValueChange={handleOptionValueChange} optionsValue={optionsValue} isOptionsSelected={isOptionsSelected} optionsErrMessage={optionsErrMessage} noAnswerErrMessage={noAnswerErrMessage}/> : null }
                    { type === "single-answer-multiple-choice"? <SingleAnswerMultipleChoice handleIsOptionsSelectedChange={handleIsOptionsSelectedChange} handleOptionValueChange={handleOptionValueChange} optionsValue={optionsValue} isOptionsSelected={isOptionsSelected} optionsErrMessage={optionsErrMessage} noAnswerErrMessage={noAnswerErrMessage} /> : null }
                    { type === "single-word-answer"? <SingleWordAnswer handleOptionValueChange={handleOptionValueChange} optionsValue={optionsValue} optionsErrMessage={optionsErrMessage}/> : null }
                    { type === "true-or-false"? <TrueOrFalse handleIsOptionsSelectedChange={handleIsOptionsSelectedChange} isOptionsSelected={isOptionsSelected} noAnswerErrMessage={noAnswerErrMessage}/> : null }
                </div>
                <ActionButton action={saveQ} 
                    text={"Save"} icon={"ri-save-fill"} isOnLoad={isOnLoad} />
            </div>
        </div>
    )
}

export default CreateQuestion