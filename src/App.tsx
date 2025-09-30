import { Routes, Route, Navigate } from 'react-router'
import { useContext } from 'react'
import { UserContext } from './providers/user_provider'
import LoginSignupLayout from './layouts/loginsign_layout'
import Login from './pages/login'
import Signup from './pages/signup'

function App() {

  const { user } = useContext(UserContext)

  return (
    <Routes>
      {/* == if user tries to access "/" without log in == */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* == login and sign up == */}
      <Route element={<LoginSignupLayout />} >
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* == routes for student == */}
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
      {/* <Route path="*" element={<NotFound />} />  */}
    </Routes>
  )
}

export default App