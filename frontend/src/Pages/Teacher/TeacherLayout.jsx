import React from 'react'
import TodayDate from '../../components/TodayDate'
import HeaderItem from '../../components/HeaderItem'
import { Outlet } from 'react-router-dom'
import { CalendarIcon, UserIcon } from '@heroicons/react/24/solid'

function TeacherLayout() {
  return (
    <>
      <div className='header__nav flex shadow-md top-0 bg-white h-20'>

      <div className='w-52 ml-8 flex flex-col items-center'>
          <div className='font-bold text-2xl pt-4 text-sky-700' >Ejeryemploi</div>
          <div className='text-xs pb-2 text-sky-700'><TodayDate /></div>
        </div>

        <div className='flex items-center w-full justify-center'>

          <HeaderItem
            icon={<CalendarIcon className='w-5' />}
            pathlink="/Teacher"
            itemTitle="Emplois du temps"
          />

          <HeaderItem
            icon={<UserIcon className='w-5 ' />}
            pathlink="/Teacher/TeacherDetails"
            itemTitle="Enseignant"
          />
          {/* <HeaderItem
    icon={<BellIcon className='w-5 ' />}
    pathlink="/Teacher/TeacherNotification"
    itemTitle="Notifications"
  /> */}

        </div>
      </div>
      <Outlet />
    </>
  )
}

export default TeacherLayout