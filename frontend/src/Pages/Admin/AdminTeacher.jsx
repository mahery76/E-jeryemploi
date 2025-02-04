import React, { useState } from 'react'
import TeacherList from '../../components/Admin/AdminTeacher/TeacherList'
import TeacherDetails from '../../components/Admin/AdminTeacher/TeacherDetails'
import { MyContext } from '../../Contexts/MyContext'
import TeacherCompte from '../../components/Admin/AdminTeacher/TeacherCompte'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Navigate } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

function AdminTeacher() {
  const [id_ens, setId_ens] = useState("")
  const [isMenuList, setIsMenuList] = useState(false)
  const isConnected = localStorage.getItem("isConnected")

  if (isConnected === "false") {
    return <Navigate replace to="/" />
  }
  else if (isConnected === "true") {
    return (
      <div className='
        bg-gray-200 mt-1
        md:flex
        '
      >
        <MyContext.Provider value={{ id_ens, setId_ens }}>

          {/* menu icon button */}
          <div
            className={`
                      ${isMenuList ? 'hidden' : 'absolute'} mt-4 flex items-center        
                      md:hidden 
                      `}
            onClick={() => { setIsMenuList(() => true) }}
          >
            <ChevronRightIcon className='w-5 m-2 cursor-pointer'/>
          </div>

          {/* list container of teacher */}
          <div className={`
                        ${isMenuList ? 'block' : 'hidden'}
                        md:block
                        `}>
            <TeacherList setIsMenuList={setIsMenuList} />
          </div>

          {/* content of one teacher  */}
          <div
            className={`
            overflow-auto scrollbar
            h-[calc(100vh-80px)] 
            md:w-full md:h-[calc(100vh-80px)] 
            
            ${isMenuList ? 'hidden' : 'block'}
            `}
          >
            <TeacherDetails />
            <TeacherCompte />
          </div>
        </MyContext.Provider>

      </div>
    )
  }
}
export default AdminTeacher