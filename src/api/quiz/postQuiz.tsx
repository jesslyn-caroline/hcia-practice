import axios from "axios";
import type { QuestionModel } from "../../model/question_model";
import toast_error from "../../components/toast/toast_error";

interface Props {
    questionCount: number,
    quizType: number,
    timeLimit: number,
    timePerQuestion: number
}

async function postQuiz({ questionCount, quizType, timeLimit, timePerQuestion }: Props) {
    let data : { questions: QuestionModel[], quizId: string } = {
        questions: [],
        quizId: ""
    }

    try {
        const response = await axios.post("https://huawei-practice-web-backend.vercel.app/api/quiz", {
            title: "-",
            questionCount,
            type: quizType === 1? "flash" : "regular",
            time: (quizType === 1) ? timePerQuestion : timeLimit
        })

        if (response.status === 201) {
            data ={
                questions: response.data.quiz.questions,
                quizId: response.data.quiz._id
            };
        }
    }
    catch (err: any) {
        toast_error(err.message)
        
    }
    return data
}

export default postQuiz