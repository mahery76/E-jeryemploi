import React, { useState } from 'react'
import { getHttp } from '../../../Api/httpget'
import ListOfGroupTimetable from './GroupeTeacherList/ListOfGroupTimetable'
import SearchGroup from '../AdminAffectation/GroupList/SearchGroup'
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function GroupTeacherList() {
  const [term, setTerm] = useState("")
  const resClasse = getHttp(`http://localhost:3001/api/group`)
  return (
    <div className='flex flex-col items-center bg-white p-6'>

      {/* satria mitovy aby ny composant search */}
      <SearchGroup term={term} setTerm={setTerm} />
      {resClasse.data && <ListOfGroupTimetable term={term} classes={resClasse.data} />}
    </div>
  ) 
}

export default GroupTeacherList