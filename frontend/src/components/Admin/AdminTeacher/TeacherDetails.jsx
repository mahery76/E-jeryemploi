import React from 'react'
import TeacherInfo from './TeacherDetails/TeacherInfo'
import DispoTable from './TeacherDetails/DispoTable'
function TeacherDetails() {
  return (
      <div className=" 
        
        mt-4 bg-white p-4 rounded-xl 
        md:mx-8
        lg:mx-8 lg:flex md:justify-evenly
        ">
        <TeacherInfo />
        <DispoTable/>
      </div>
  )
}

export default TeacherDetails