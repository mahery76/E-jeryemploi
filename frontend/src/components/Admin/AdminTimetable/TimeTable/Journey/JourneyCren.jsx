import React, { useContext, useEffect, useState } from 'react'
import { ClasseContext } from '../../../../../Contexts/MyContext'
import axios from 'axios'
import { isSameDay } from '../../../../../Helpers/Calendar'
import { PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline'
import AddBoxTimetable from './JourneyCren/AddBoxTimetable'

function JourneyCren({ id_cren, date, isGenerated }) {
    const [allOccupations, setAllOccupations] = useState([])
    const { id_classe } = useContext(ClasseContext)

    const [id_occupation, setId_occupation] = useState('')
    const [matiere, setMatiere] = useState('')
    const [enseignant, setEnseignant] = useState('')
    const [salle, setSalle] = useState('')

    const [isDone, setIsDone] = useState(false)
    const className = isDone ? 'bg-white' : 'bg-slate-100 border-2 border-sky-700'
    const [vh_restante, setVh_restante] = useState(0)

    const [exist, setExist] = useState(false)
    const editStyle = exist ? "invisible group-hover:visible" : "invisible"
    const addStyle = date < new Date() || exist ? "hidden" : "block"

    const [isNewOcc, setIsNewOcc] = useState(false)



    //get all occupation that match the cren and id_classe 
    const getOccupations = async () => {
        if (id_classe) {
            const res = await axios.get(`http://localhost:3001/api/occupations?id_classe=${id_classe}&id_cren=${id_cren}`)
            setAllOccupations(() => res.data)
        }
    }
    useEffect(() => {
        // setTimeout(() => {
            getOccupations()
        // }, [4000])
    }, [isGenerated])

    useEffect(() => {
        getOccupations()
    }, [id_classe, date, isGenerated, isNewOcc])

    useEffect(() => {
        const occFound = allOccupations.find(function (occ) {
            return (
                isSameDay(new Date(occ.date_occupation), date) &&
                occ.id_cren === id_cren &&
                occ.id_classe === id_classe
            )
        })
        if (occFound) {
            setMatiere(occFound.nom_matiere)
            setEnseignant(occFound.nom_ens)
            setSalle(occFound.nom_salle)
            setVh_restante(occFound.vh_restante)
            setId_occupation(occFound.id_occupation)
            setIsDone(occFound.isDone)

            setExist(true)
        }
        else {
            setMatiere("")
            setEnseignant("")
            setSalle("")
            setVh_restante("")
            setId_occupation("")
            setIsDone(false)
            setExist(false)
        }
    }, [allOccupations, date, id_classe, isNewOcc])
    const handleSetToDone = async (id_occupation, isDone) => {
        if (!isDone) {
            if (window.confirm(`Voulez vous marquer comme terminé cette séance ${id_occupation}`)) {
                const resp = await axios.get(`http://localhost:3001/api/setDone/${id_occupation}`)
                setIsDone(true)
            }
        }
    }
    return (
        <div
            className={`
            ${className} 
            flex flex-col rounded-md items-center justify-center 
            m-4 w-28 h-32 cursor-pointer 
            hover:bg-slate-200
            group
            `
            }
        >
            <div className='font-bold text-xs flex justify-center text-center w-26 my-2'>
                {matiere}
            </div>

            <div className='text-xs text-italic flex justify-center text-center w-full mb-2'>
                <p className='italic'>{enseignant}</p>
            </div>

            <div className='text-xs grid grid-cols-5 text-center w-full mb-2'>
                <div className='col-span-4'>{salle}</div>
                <div
                    className={`
                    ${editStyle}
                    hover:bg-slate-300
                    rounded-md
                    flex
                    justify-center
                    `}
                >
                    <PencilSquareIcon
                        className='stroke-sky-800 w-4 cursor-pointer'
                        onClick={() => handleSetToDone(id_occupation, isDone)}
                    />
                </div>

            </div>
            <div
            className={`
            ${addStyle}
            rounded-md
            flex
            justify-center
            `}>
               <AddBoxTimetable 
               id_cren = {id_cren}
               date = {date}
               setIsNewOcc = {setIsNewOcc}
               />
            </div>
        </div >
    )
}

export default JourneyCren