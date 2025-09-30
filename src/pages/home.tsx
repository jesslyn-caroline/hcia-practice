import { useContext } from "react"
import { UserContext } from "../providers/user_provider"
import quizHistory from "../hooks/quiz/quizHistory"
import { Link } from "react-router"

function Home() {
    const { user } = useContext(UserContext)

    const {history, isOnLoad} = quizHistory()

    return (
        <div>
            <i className={`text-5xl ri-robot-2-line`}></i>
            <div className={`mt-5 font-semibold`}>
                <h1 className={`text-xl`}>Hello, {user.username}</h1>
                <h2 className={`text-zinc-400`}>How are you today?</h2>
            </div>
            <div className={`max-w-screen mb-20 overflow-x-scroll scroll-bar-hidden`}>
            {
                isOnLoad? (
                    <div className={`flex justify-center my-8`}>
                        <i className={`ri-loader-line animate-spin text-4xl origin-center`}/>
                    </div>
                ) : (
                    history.length === 0? (
                        <div className={`flex justify-center my-8`}>
                            <span className={`text-gray-400`}>No quiz taken yet</span>
                        </div>
                    ) : null
                )
            }
            {
                history.length > 0? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="text-gray-500 uppercase">
                            <tr>
                                <th scope="col" className="w-12 font-medium">No.</th>
                                <th scope="col" className="px-6 py-3 font-medium">Time</th>
                                <th scope="col" className="px-6 py-3 font-medium">Type</th>
                                <th scope="col" className="font-medium">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                ...history.map((quiz, index) => { 
                                    return (
                                    <tr>
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3 text-center">{quiz.time}</td>
                                        <td className="px-6 py-3 text-center">{quiz.type}</td>
                                        <td className="px-6 py-3 text-center">{quiz.score}</td>
                                        <td className="px-6 py-3 text-center">
                                            <Link to={`/quiz/result/${quiz.quizId}`}>
                                                VIEW
                                            </Link>
                                        </td>
                                    </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                ) : null
            }
            </div>
        </div>
    )
}

export default Home
