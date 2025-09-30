import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './providers/user_provider'
import LoginSignupLayout from './layouts/loginsign_layout'
import Login from './pages/login'
import Signup from './pages/signup'
import MainLayout from './layouts/main_layout'
import Home from './pages/home'
import NotFound from './pages/not_found'
import CreateQuestion from './pages/admin/createquestion'
import EditQuestion from './pages/admin/editquestion'
import QuestionList from './pages/admin/questionList'
import QuizMenu from './pages/quiz/quiz_menu'
import OnQuizRegular from './pages/quiz/on_quiz_regular'
import OnQuizFlash from './pages/quiz/on_quiz_flash'
import QuizResult from './pages/quiz/quiz_result'

function App() {

  const { user } = useContext(UserContext)

  return (
    <Routes>
        {/* == if user tries to access "/" without log in == */}
        <Route path="/" element={<Navigate to="/login" />} /> : null

        {/* == login and sign up == */}
        <Route element={<LoginSignupLayout />} >
            <Route path="/login" element={ <Login />} />
            <Route path="/signup" element={<Signup />} />
        </Route>

        {/* == routes for student == */} {
            user.role === "student"? 
            <>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home />} />
              <Route path="/quiz">
                <Route index element={<QuizMenu />} />
              </Route>
              <Route path="/quiz">
                <Route index element={<QuizMenu />} />
              </Route>
              <Route path="/quiz/result/:quizId" element={<QuizResult />} />
            </Route>
            <Route path="/quiz/regular/ongoing" element={<OnQuizRegular />} />
            <Route path="/quiz/flash/ongoing" element={<OnQuizFlash />} />
            </>
             : null }
        
        {/* == routes for admin == */}{
            user.role === "admin"? 
            <>
            <Route path="/" element={<MainLayout/>}>
              <Route index element={<Home />} />
              <Route path="/question">
                <Route index element={<QuestionList />} />
                <Route path="new" element={<CreateQuestion />} />
                <Route path="edit/:id" element={<EditQuestion />} />
              </Route>
              <Route path="/quiz">
                <Route index element={<QuizMenu />} />
              </Route>
              <Route path="/quiz/result/:quizId" element={<QuizResult />} />
            </Route>
            <Route path="/quiz/regular/ongoing" element={<OnQuizRegular />} />
            <Route path="/quiz/flash/ongoing" element={<OnQuizFlash />} />
            </>
             : null }

      
    
      {/* ==== */}

      {/* {
        user.role === "student"? 
        <>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          {
            user.userId === null?
            <Route path="/class" element={<ClassEnter />} />
            :
            <Route path="/class" element={<ClassView />}/>
          }
          <Route path="/quiz/menu" element={<QuizMenu />} />
          <Route path="/quiz/new" element={<QuizNew />} />
          <Route path="/quiz/result/:quizId" element={<QuizResult />} />
          <Route path="/assignment" element={<AssignmentMenu />} />
          <Route path="/assignment/:assignmentId/" element={<AssignmentStart />}/>

        </Route> 
        <Route path="/quiz/regular/ongoing" element={<OnQuizRegular />} />
        <Route path="/quiz/flash/ongoing" element={<OnQuizFlash />} />
        
        </>: null
        
      }

      {
        user.role === "admin"? 
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/question/new" element={
            <CreateQuestionProvider>
              <CreateQuestion />
            </CreateQuestionProvider> 
          } />
          <Route path="/question" element={<QuestionList />} />
          <Route path="/question/edit/:id" element={
            <EditQuestionProvider>
               <EditQuestion />
            </EditQuestionProvider>} />
          <Route path="/classes" element={
            <ClassListProvider>
              <ClassList />
            </ClassListProvider> }/>
          <Route path="/class/:id" element={
              <ClassView />
          } />
          <Route path="/class/new" element={
            <NewClass />
          }/>
          <Route path="/assignment" element={<AssignmentMenu />} />
          <Route path="/assignment/:assignmentId/" element={<AssignmentDetail />}>
            <Route index element={<AssignmentDetailInfo />} />
            <Route path="questions" element={<AssignmentQuestions />} />
            <Route path="submissions" element={<AssignmentSubmission />} />
          </Route>
          <Route path="/assignment/new" element={<AssignmentNew />} />
        </Route> : null
      }
      
      {/* == unauthorized == */}
      <Route path="*" element={<NotFound />} /> 
    </Routes>
  )
}

export default App