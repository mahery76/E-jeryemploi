import React, { useContext, useEffect, useState } from 'react'
import AddBoxAffectation from './GroupList/AddBoxAffectation'

import ListOfGroup from './GroupList/ListOfGroup'
import SearchGroup from './GroupList/SearchGroup'
import { ActeurContext } from '../../../Contexts/MyContext'
import { getHttp } from '../../../Api/httpget'
import ListOfTeacherInAffectation from './GroupList/ListOfTeacherInAffectation'
import { XCircleIcon } from '@heroicons/react/24/solid'

function GroupList({ setIsMenuList }) {
  const [term, setTerm] = useState("")
  const { acteur, setActeur } = useContext(ActeurContext)

  const resEns = getHttp(`http://localhost:3001/api/enseignant`)
  const resClasse = getHttp(`http://localhost:3001/api/group`)

  useEffect(() => {
    setActeur('CLS')
  }, [])

  useEffect(() => {
    console.log(acteur)
  }, [acteur])


  return (
    <div className="flex flex-col items-center bg-white p-6 ">

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
      <SearchGroup term={term} setTerm={setTerm} />
      {acteur === "CLS" && resClasse.data && <ListOfGroup term={term} classes={resClasse.data} setIsMenuList={setIsMenuList}/>}
      {acteur === "ENS" && resEns.data && <ListOfTeacherInAffectation term={term} enseignants={resEns.data} />}
      {acteur === "CLS" && <AddBoxAffectation />}

    </div>
  )
}
export default GroupList