import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

function SearchTeacher({term, setTerm}) {
    const handleChange = (e) => {
        setTerm(e.target.value)
    }
 
    return (
        <div className='flex mb-4 mt-8 items-center '>
            <MagnifyingGlassIcon className='w-5 ml-2 stroke-gray-500 absolute' />
            <input
                value={term}
                type="text"
                onChange={(e) => {handleChange(e)}}
                name="" id=""
                className='text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-60'
            />
        </div>
    )
}

export default SearchTeacher