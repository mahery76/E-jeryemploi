import React, { useEffect, useState } from 'react'
import AddBox from './TeacherList/AddBox'
import { getHttp } from '../../../Api/httpget'
import ListOfTeacher from './TeacherList/ListOfTeacher'
import SearchTeacher from './TeacherList/SearchTeacher'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'

function TeacherList({ setIsMenuList }) {

    const [term, setTerm] = useState("")
    const { data: enseignants, error } = getHttp(`http://localhost:3001/api/enseignant`)

    return (
        <div className=" flex flex-col items-center bg-white p-6 ">
            <div
                className='
                        w-full flex justify-end
                        md:hidden
                        '
            >
                <XCircleIcon
                    className='w-5 m-2 cursor-pointer'
                    onClick={() => { setIsMenuList(() => false) }}
                />
            </div>

            <SearchTeacher term={term} setTerm={setTerm} />
            {error && <div>{error}</div>}
            {enseignants && <ListOfTeacher term={term} enseignants={enseignants} setIsMenuList={setIsMenuList}/>}
            <AddBox />
        </div>
    )
}
export default TeacherList