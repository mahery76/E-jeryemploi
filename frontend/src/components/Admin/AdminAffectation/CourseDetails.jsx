import React, { useContext, useEffect, useState } from 'react'
import { AffectationContext } from '../../../Contexts/MyContext'
import { ArrowPathIcon, MagnifyingGlassIcon, TrashIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { deleteHttp } from '../../../Api/httpget'


function CourseDetails() {
  const [isDeleted, setIsDeleted] = useState(false)
  const [affectations, setAffectation] = useState([])
  const [affectationsFiltered, setAffectationFiltered] = useState([])
  const { id_affectation } = useContext(AffectationContext)

  const getData = async () => {
    // const res = await axios.get(`http://localhost:3001/api/Affectation/`)
    // if (res.data) {
    //   console.log(res.data)
    //   setAffectation(res.data)
    //   setAffectationFiltered(res.data)
    // }
    fetch(`http://localhost:3001/api/Affectation/`)
    .then(response => response.json())
    .then(data => setAffectation(data))
    .catch(error => console.error(error))

  }

  const handleSearch = (e, affectations) => {
    if (!e.target.value) return setAffectationFiltered(affectations)
    const result = affectations.filter(aff => {
      return (
        aff.nom_classe.toLowerCase().includes(e.target.value.toLowerCase()) ||
        aff.nom_matiere.toLowerCase().includes(e.target.value.toLowerCase()) ||
        aff.nom_ens.toLowerCase().includes(e.target.value.toLowerCase())
      )
    })
    setAffectationFiltered(result)
  }

  const handleDelete = async (id_affectation) => {
    const confirmed = window.confirm('Voulez-vous bien supprimer?');
    if (confirmed) {
      const deleteAffectation = await deleteHttp(`http://localhost:3001/api/affectation/${id_affectation}`)
      if (deleteAffectation) {
        setAffectationFiltered(setAffectationFiltered.filter(item => item.id_affectation !== id_affectation))
        setIsDeleted(!isDeleted)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [id_affectation, isDeleted])

  return (
    <div className=" my-8 bg-white px-8 rounded-xl flex flex-col items-center">
      {/* entete */}
      <div className='flex justify-evenly w-full items-center my-6'>
        <div
          className='text-sky-700 font-bold text-lg my-4 cursor-pointer flex items-center'
        >
          Listes des attributions Classe Matière Enseignant
          <ArrowPathIcon
            className='stroke-red-800 w-5 m-2 cursor-pointer'
            onClick={() => setIsDeleted(() => !isDeleted)}
          />
        </div>
        <div className='flex items-center'>
          <MagnifyingGlassIcon className='w-5 ml-2 stroke-gray-500 absolute' />
          <input
            className=" bg-gray-200 h-12 rounded-xl w-64 my-2 pl-8"
            type="text"
            onChange={(e) => handleSearch(e, affectations)}
          />
        </div>

      </div>

      <div className='flex mb-4 justify-between h-10 items-center w-full -ml-3 pr-4'>
        <div className=' text-center bg-green-100  w-20 truncate '>Classe</div>
        <div className=' text-center bg-green-100  w-32 truncate '>Matière</div>
        <div className=' text-center bg-green-100  w-32 truncate '>Enseignant</div>
        <div className=' text-center bg-green-100  w-20 truncate '>Volume horaire</div>
        <div className=' text-center bg-green-100  w-20 truncate '>Vh restantes</div>
        <div className=' text-center bg-green-100  w-20 truncate '>Ref Tronc commun</div>
        <div className=' text-center bg-green-100  w-20 truncate '>Salle</div>

        <div className=' text-center bg-green-100  w-5 truncate '></div>
      </div>
      {/* liste affectation  */}

      <div className='max-h-80 overflow-auto scrollbar'>
        {
          affectationsFiltered.map((aff) => (
            <div
              className='flex gap-1 border-b-2 border-gray-300  justify-center h-10 items-center
              hover:bg-slate-200
              '
              key={aff.id_affectation}
            >
              <div className='w-20 truncate ' title={aff.nom_classe}      >{aff.nom_classe}      </div>
              <div className='w-32 truncate ' title={aff.nom_matiere}     >{aff.nom_matiere}     </div>
              <div className='w-32 truncate ' title={aff.nom_ens}         >{aff.nom_ens}         </div>
              <div className='w-20 truncate  flex justify-center' title={aff.vh}              >{aff.vh}              </div>
              <div className='w-20 truncate  flex justify-center' title={aff.vh_restante}     >{aff.vh_restante}     </div>
              <div className='w-20 truncate flex justify-center' title={aff.nom_tronc_commun}>{aff.nom_tronc_commun}</div>
              <div className='w-20 truncate  flex justify-center' title={aff.nom_salle}       >{aff.nom_salle}       </div>

              <div>
                <TrashIcon
                  className='stroke-red-800 w-5 m-2 cursor-pointer'
                  onClick={() => handleDelete(aff.id_affectation)}
                />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CourseDetails