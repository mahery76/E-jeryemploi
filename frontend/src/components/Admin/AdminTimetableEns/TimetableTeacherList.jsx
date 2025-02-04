import React, { useState } from 'react'
import { getHttp } from '../../../Api/httpget'
import SearchGroup from '../AdminAffectation/GroupList/SearchGroup'
import ListOfTeacherTimetable from './TimetableTeacherList/ListOfTeacherTimetable'

function TimetableTeacherList() {
    const [term, setTerm] = useState("")
    const resEns = getHttp(`http://localhost:3001/api/enseignant`)
    return (
        <div className='flex flex-col items-center bg-white p-6'>

        {/* satria mitovy aby ny composant search */}
        <SearchGroup term={term} setTerm={setTerm} />
        {resEns.data && <ListOfTeacherTimetable term={term} ens={resEns.data} />}
      </div>
    )
}

export default TimetableTeacherList