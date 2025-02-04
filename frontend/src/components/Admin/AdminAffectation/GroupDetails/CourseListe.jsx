import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { AffectationContext } from '../../../../Contexts/MyContext'
import { deleteHttp } from '../../../../Api/httpget'

function CourseListe({ affectations, term }) {
  const [res, setRes] = useState([])
  const { setId_affectation } = useContext(AffectationContext)
  const getMatiere = (id_affectation) => {
    setId_affectation(() => {
      return id_affectation
    })
    console.log(id_affectation)
  }

  useEffect(() => {
    const regexPattern = new RegExp(term, "i");
    setRes(affectations.filter((item) => regexPattern.test(item.nom_matiere)))
    if(affectations.length > 0){
      setId_affectation(affectations[affectations.length - 1].id_affectation)
    }
  }, [term, affectations])

  const handleDelete = async (id_affectation) => {
    const confirmed = window.confirm('Voulez-vous bien supprimer?');
    if (confirmed) {
      const deleteAffectation = await deleteHttp(`http://localhost:3001/api/affectation/${id_affectation}`)
      setRes(res.filter(item => item.id_affectation !== id_affectation))
    }
  }
  return (
    <div className="max-h-40 overflow-auto scrollbar flex flex-col w-full ">
      {res.map((aff) => (
        <div
          className='flex items-center justify-between'
          onClick={() => getMatiere(aff.id_affectation)}
          key={aff.id_affectation}
        >
          <div className='truncate py-2 px-2 rounded-lg hover:bg-sky-100 cursor-pointer w-full'>{aff.nom_matiere}</div>
          <div>
            <TrashIcon
              className='stroke-red-800 w-5 m-2 cursor-pointer'
              onClick={() => handleDelete(aff.id_affectation)}
            />
          </div>

        </div>
      ))}
    </div>
  )
}

export default CourseListe