import React, { useState } from 'react'
import GroupList from '../../components/Admin/AdminAffectation/GroupList'
import GroupDetails from '../../components/Admin/AdminAffectation/GroupDetails'
import CourseDetails from '../../components/Admin/AdminAffectation/CourseDetails'
import { ActeurContext, AffectationContext, ClasseContext, MyContext } from '../../Contexts/MyContext'
import { Navigate } from 'react-router-dom'
import { ChevronRightIcon } from '@heroicons/react/24/solid'

function AdminAffectation() {
  const [id_affectation, setId_affectation] = useState("")
  const [id_ens, setId_ens] = useState("")
  const [acteur, setActeur] = useState("")
  const [id_classe, setId_classe] = useState("")

  const [isMenuList, setIsMenuList] = useState(false)

  const isConnected = localStorage.getItem("isConnected")

  if (isConnected === "false") {
    return <Navigate replace to="/" />
  }
  else if (isConnected === "true") {
    return (
      <div className='bg-gray-200 md:flex '>
        <ActeurContext.Provider value={{ acteur, setActeur }}>
          <MyContext.Provider value={{ id_ens, setId_ens }}>
            <ClasseContext.Provider value={{ id_classe, setId_classe }}>
              <AffectationContext.Provider value={{ id_affectation, setId_affectation }}>

                {/* list of teacher or list of  class */}
                <div
                  className={`
                            ${isMenuList ? 'hidden' : 'absolute'} mt-4 flex items-center        
                            md:hidden 
                            `}
                  onClick={() => { setIsMenuList(() => true) }}
                >
                  <ChevronRightIcon className='w-5 m-2 cursor-pointer' />
                </div>

                {/* list of all class  */}
                <div className={`
                              ${isMenuList ? 'block' : 'hidden'}
                              md:block
                              `}>
                  <GroupList setIsMenuList={setIsMenuList}/>
                </div>

               {/* content of one class  */}
                <div
                  className={`
                            overflow-auto scrollbar
                            h-[calc(100vh-80px)] 
                            md:w-full md:h-[calc(100vh-80px)] 
                            
                            ${isMenuList ? 'hidden' : 'block'}
                            lg:flex lg:px-4
                            `}>
                  <GroupDetails />
                  <CourseDetails />
                </div>

              </AffectationContext.Provider>
            </ClasseContext.Provider>
          </MyContext.Provider>
        </ActeurContext.Provider>
      </div>
    )
  }
}

export default AdminAffectation