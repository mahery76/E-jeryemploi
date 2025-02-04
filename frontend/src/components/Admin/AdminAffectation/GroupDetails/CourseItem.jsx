import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

function CourseItem() {
  return (
    <div className='flex items-center justify-center'>
      <div className='truncate py-2 px-2 rounded-lg hover:bg-sky-100 cursor-pointer'>Nom de la matiere</div>
      <div>
        <TrashIcon className='stroke-red-800 w-5 m-2 cursor-pointer' />
      </div>
     
    </div>
  )
}

export default CourseItem