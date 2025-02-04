import React from 'react'
import TeacherDetails from '../../components/Admin/AdminTeacher/TeacherDetails'
import TeacherCompte from '../../components/Admin/AdminTeacher/TeacherCompte'

function TeacherPersoInfo() {
  return (
    <div className='bg-gray-100 flex justify-evenly w-full h-[calc(100vh-80px)] overflow-auto scrollbar'>
      <TeacherDetails />
      <TeacherCompte />
    </div>
  )
}

export default TeacherPersoInfo