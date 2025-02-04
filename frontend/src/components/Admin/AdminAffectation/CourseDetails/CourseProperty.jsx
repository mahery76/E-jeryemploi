import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React from 'react'

function CourseProperty({ detailTitle, detailValue }) {
    return (
        <div className="bg-white mt-2">
            <div className="text-sky-700 font-bold text-base bg-white text-center">{detailTitle}</div>
            <div className="flex justify-between bg-white w-60 h-8">
                <div className='truncate'>{detailValue}</div> 
            </div>
        </div>
    )
}

export default CourseProperty