import React from 'react'

function Slots() {
    return (
        <div className='text-center w-full '>
            <div className='mb-4'>Horaire</div>

            <div className='grid grid-rows-4'>
                <div className="slotsItem truncate h-20 bg-blue-100 mb-2 flex items-center justify-center rounded-xl">08:00-10:00</div>
                <div className="slotsItem truncate h-20 bg-blue-100 mb-2 flex items-center justify-center rounded-xl">08:00-10:00</div>
                <div className="slotsItem truncate h-20 bg-blue-100 mb-2 flex items-center justify-center rounded-xl">08:00-10:00</div>
                <div className="slotsItem truncate h-20 bg-blue-100 mb-2 flex items-center justify-center rounded-xl">08:00-10:00</div>
            </div>
        </div>
    )
}

export default Slots