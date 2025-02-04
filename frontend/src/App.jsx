import { Route, Routes } from "react-router-dom"
import Connexion from "./Pages/Connexion"
import AdminLayout from "./Pages/Admin/AdminLayout"
import AdminAffectation from "./Pages/Admin/AdminAffectation"
import AdminNotification from "./Pages/Admin/AdminNotification"
import AdminTeacher from "./Pages/Admin/AdminTeacher"
import NotFound from "./Pages/NotFound"
import AdminTimetable from "./Pages/Admin/AdminTimetable"
import TeacherTimetable from "./Pages/Teacher/TeacherTimetable"
import TeacherNotification from "./Pages/Teacher/TeacherNotification"
import StudentTimetable from "./Pages/Student/StudentTimetable"
import StudentDetails from "./Pages/Student/StudentDetails"
import StudentNotification from "./Pages/Student/StudentNotification"
import TeacherLayout from "./Pages/Teacher/TeacherLayout"
import StudentLayout from "./Pages/Student/StudentLayout"
import TeacherPersoInfo from "./Pages/Teacher/TeacherPersoInfo"

function App() {
  // localStorage.setItem('isConnected', "true")
  return (
    <div>
    <Routes>
      <Route path="/" element={<Connexion/>} />
      
      {/* admin */}
      <Route path="/Admin" element={<AdminLayout/>}>
        <Route index element={<AdminTimetable />} />
        <Route path="AdminAffectation" element={<AdminAffectation/>} />
        <Route path="AdminTeacher" element={<AdminTeacher/>} />
        {/* <Route path="AdminNotification" element={<AdminNotification/>} /> */}
      </Route>
 
      {/* Teacher */}
      
      <Route path="/Teacher" element={<TeacherLayout/>}>
        <Route index element={<TeacherTimetable />}/>
        <Route path="TeacherDetails" element={<TeacherPersoInfo/>}/>
        <Route path="TeacherNotification" element={<TeacherNotification/>}/>
      </Route>

      {/* Student */}
      <Route path="/Student" element={<StudentLayout/>}>
        <Route index element={<StudentTimetable />}/>
        <Route path="StudentDetails" element={<StudentDetails />}/>
        <Route path="StudentNotification" element={<StudentNotification />}/>
      </Route>

      <Route path="*" element={<NotFound/>} />

    </Routes>
    </div>
  )
}

export default App
