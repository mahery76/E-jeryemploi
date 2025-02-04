import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../../Contexts/MyContext'
import axios from 'axios'
import { isSameDay } from '../../../../../Helpers/Calendar'
import { TrashIcon } from '@heroicons/react/24/outline'

function JourneyEnsCren({ id_cren, date }) {
  const [allOccupations, setAllOccupations] = useState([])
  const { id_ens } = useContext(MyContext)

  const [id_occupation, setId_occupation] = useState('')
  const [classe, setClasse] = useState('')
  const [classe2, setClasse2] = useState('')
  const [classe3, setClasse3] = useState('')
  const [matiere, setMatiere] = useState('')
  const [enseignant, setEnseignant] = useState("")
  const [salle, setSalle] = useState('')

  const [isDone, setIsDone] = useState(false)
  const className = isDone ? 'bg-white' : 'bg-slate-100 border-2 border-sky-700'
  const [vh_restante, setVh_restante] = useState(0)
  const [valeur_cren, setValeur_cren] = useState("")

  const [exist, setExist] = useState(false)
  const iconStyle = exist ? "invisible group-hover:visible" : "invisible"

  const getOccupations = async () => {
    if (id_ens) {
      const res = await axios.get(`http://localhost:3001/api/occupationsEns?id_ens=${id_ens}&id_cren=${id_cren}`)
      setAllOccupations(() => res.data)
    }
  }
  useEffect(() => {
    getOccupations()
  }, [id_ens, date, exist])

  useEffect(() => {
    const occFound = allOccupations.filter(function (occ) {
      return (
        isSameDay(new Date(occ.date_occupation), date) &&
        occ.id_cren === id_cren &&
        occ.id_ens === id_ens
      )
    })
    console.log(occFound)

    if (occFound.length > 2) {
      setMatiere(occFound[0].nom_matiere)
      setClasse(occFound[0].nom_classe)
      setClasse2(occFound[1].nom_classe)
      setClasse3(occFound[2].nom_classe)
      setSalle(occFound[0].nom_salle)
      setVh_restante(occFound[0].vh_restante)
      setId_occupation(occFound[0].id_occupation)
      setIsDone(occFound[0].isDone)
      setExist(true)

    }
    else if (occFound.length > 1) {
      setMatiere(occFound[0].nom_matiere)
      setClasse(occFound[0].nom_classe)
      setClasse2(occFound[1].nom_classe)
      setClasse3('')
      setSalle(occFound[0].nom_salle)
      setVh_restante(occFound[0].vh_restante)
      setId_occupation(occFound[0].id_occupation)
      setIsDone(occFound[0].isDone)
      setExist(true)

    }
    else if (occFound.length > 0) {
      setMatiere(occFound[0].nom_matiere)
      setClasse(occFound[0].nom_classe)
      setClasse2("")
      setClasse3("")
      setSalle(occFound[0].nom_salle)
      setVh_restante(occFound[0].vh_restante)
      setId_occupation(occFound[0].id_occupation)
      setIsDone(occFound[0].isDone)
      setExist(true)

    }
    else {
      setMatiere("")
      setClasse("")
      setClasse2("")
      setClasse3("")
      setSalle("")
      setVh_restante("")
      setId_occupation("")
      setIsDone(false)

      setExist(false)

    }
  }, [allOccupations, date, id_ens])

  const handleDelete = async (id_occupation) => {
    if(!isDone){
      if (window.confirm(`Voulez vous supprimer le seance ${id_occupation}`)) {
        const resp = await axios.get(`http://localhost:3001/api/deleteOccupation/${id_occupation}`)
        setMatiere("")
        setClasse("")
        setClasse2("")
        setClasse3("")
        setSalle("")
        setVh_restante("")
        setId_occupation("")
        setIsDone(false)
        setExist(false)
      }
    }
  }


  return (
    <div
      className={`
    ${className} 
    flex flex-col rounded-md  items-center justify-center 
    m-4 w-28 h-32 cursor-pointer 
    hover:bg-slate-200
    group
    `
      }
    >
      <div className='font-bold text-xs flex justify-center text-center w-full my-2'>
        {matiere}
      </div>

      <div className='text-xs text-italic flex justify-center text-center w-full mb-2'>
        <p className='italic'>{classe}  {classe2}</p>
      </div>

      <div className='text-xs grid grid-cols-5 text-center w-full mb-2'>
        <div className='col-span-4'>{salle}</div>
        <div
          className={`
                    ${iconStyle}
                    hover:bg-slate-300
                    rounded-md
                    flex
                    justify-center
                    `}>
          <TrashIcon
            className='stroke-red-800 w-4 cursor-pointer'
            onClick={() => handleDelete(id_occupation)}
          />
        </div>
      </div>



    </div>
  )
}

export default JourneyEnsCren