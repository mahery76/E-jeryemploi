import React from 'react'
import Timetable from '../../components/Admin/AdminTimetable/Timetable'

function TeacherTimetable() {
  return (
    <div className='bg-gray-100 pt-4 w-full h-[calc(100vh-80px)] overflow-auto scrollbar'>
      <Timetable />

    </div>
  )
}

export default TeacherTimetable