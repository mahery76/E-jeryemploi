import React, { useEffect, useState } from 'react'
import GroupTeacherList from '../../components/Admin/AdminTimetable/GroupTeacherList'
import Timetable from '../../components/Admin/AdminTimetable/Timetable'
import { ClasseContext, MyContext } from '../../Contexts/MyContext'
import TimetableTeacherList from '../../components/Admin/AdminTimetableEns/TimetableTeacherList'
import TimetableEns from '../../components/Admin/AdminTimetableEns/TimetableEns'
import { Navigate } from 'react-router-dom'

function AdminTimetable() {
  const [id_classe, setId_classe] = useState("")
  const [id_ens, setId_ens] = useState("")
  const [acteur, setActeur] = useState("Classe")
  const isConnected = localStorage.getItem("isConnected")


  useEffect(() => {
    console.log(acteur)
  }, [acteur])

  if (isConnected === "false") {
    return <Navigate replace to="/" />
  }
  else if (isConnected === "true"){
    return (
      <div className='bg-gray-200 flex mt-1 '>

        <MyContext.Provider value={{ id_ens, setId_ens }}>
          <ClasseContext.Provider value={{ id_classe, setId_classe }}>

            <div className='flex flex-col items-center bg-white'>
              {/* two button for toggling between groups and teacher */}
              <div className='flex justify-between w-full px-6 mt-5'>
                <input type="button"
                  value="Classes" name="" id=""
                  className='ajouterEnregistrer mt-4 h-10 w-28 '
                  onClick={() => { setActeur(() => "Classe") }}
                />
                <input type="button"
                  value="Enseignants" name="" id=""
                  className='ajouterEnregistrer mt-4 h-10 w-28 '
                  onClick={() => { setActeur(() => "Ens") }}
                />
              </div>


              {acteur === "Classe" && <GroupTeacherList />}
              {acteur === "Ens" && <TimetableTeacherList />}

            </div>

            {/* emploi du temps */}
            <div className='w-full'>
              {acteur === "Classe" && <Timetable />}
              {acteur === "Ens" && <TimetableEns />}
            </div>

          </ClasseContext.Provider>
        </MyContext.Provider>

      </div>
    )
  }
}

export default AdminTimetable