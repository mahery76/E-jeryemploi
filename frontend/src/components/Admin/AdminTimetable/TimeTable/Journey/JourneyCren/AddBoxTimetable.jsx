import { PlusIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'
import InputElementSalleTimetable from './InputElementSalleTimetable'
import InputElementAffectation from './InputElementAffectation'
import { ClasseContext } from '../../../../../../Contexts/MyContext'
import axios from 'axios'

function AddBoxTimetable({ id_cren, date, setIsNewOcc }) {
    const [id_salle, setId_salle] = useState(null)
    const { id_classe } = useContext(ClasseContext)

    
    const [id_matiere, setId_matiere] = useState(null)
    const [id_ens, setId_ens] = useState(null)
    const [id_tronc_commun, setId_tronc_commun] = useState(null)



    const [isOpen, setIsOpen] = useState(false)
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    };
    const handleAdd = async (e) => {
        e.preventDefault()
        const newOccupation = {
            "date_occupation": date,
            "id_classe": id_classe,
            "id_matiere": id_matiere,
            "id_ens": id_ens,
            "id_cren": id_cren,
            "id_tronc_commun": id_tronc_commun,
            "id_salle": id_salle
        }
        const newOcc = await axios.post(`http://localhost:3001/api/createOccupation/`, newOccupation)
        closeModal()
        setIsNewOcc(() => true)

    }

    return (
        <div>
            {isOpen && (
                <form
                    className='
                    relative
                    mt-20
                    z-50
                    flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-200 w-60 p-4 '
                    onSubmit={(e) => handleAdd(e)}
                >

                    <button onClick={closeModal} className='w-full bg-purple-300 h-12 rounded-xl hover:bg-purple-400 border-2 border-purple-700'>Fermer</button>


                    <InputElementAffectation
                        title="Matière"
                        setId_matiere={setId_matiere}
                        setId_ens={setId_ens}
                        setId_tronc_commun={setId_tronc_commun}
                    />

                    {/* salle */}
                    <InputElementSalleTimetable
                        title="Salle"
                        setId_salle={setId_salle}
                        url={`http://localhost:3001/api/salleLibre?date=${date}&id_cren=${id_cren}&id_tronc_commun=${id_tronc_commun}`}
                    />

                    <input
                        type="submit"
                        value="Enregistrer" name="" id=""
                        className='mt-4 h-10 w-56 ajouterEnregistrer w-full'
                    />
                </form>

            )}
            <PlusIcon
                className='stroke-sky-800 w-4 cursor-pointer'
                onClick={openModal}
            />
        </div>
    )
}

export default AddBoxTimetable