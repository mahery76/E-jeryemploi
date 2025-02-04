import React, { useContext, useRef, useState } from 'react'
import { AffectationContext, ClasseContext } from '../../../../Contexts/MyContext';
import { postHttp } from '../../../../Api/httpget';
import InputElementEnseignant from './AddBoxGroupDetails/InputElementEnseignant'
import InputElementMatiere from './AddBoxGroupDetails/InputElementMatiere'
import InputElementSalle from './AddBoxGroupDetails/InputElementSalle'
import InputElementTC from './AddBoxGroupDetails/InputElementTC'


function AddBoxGroupDetails() {
    const {setId_affectation} = useContext(AffectationContext)
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef(null)
    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    };
    //volume restante
    const vh = useRef()
    //id_classe 
    const { id_classe } = useContext(ClasseContext)
    const [id_matiere, setId_matiere] = useState(null)
    const [id_ens, setId_ens] = useState(null)
    const [id_tronc_commun, setId_tronc_commun] = useState(null)
    const [id_salle, setId_salle] = useState(null)

    const handleAdd = async (e) => {
        e.preventDefault()
        const newAffectation = {
            "vh": vh.current.value,
            "id_classe": id_classe,
            "id_ens": id_ens,
            "id_matiere": id_matiere,
            "id_tronc_commun": id_tronc_commun,
            "id_salle": id_salle
        }
        const res = await postHttp(`${import.meta.env.REACT}/affectation`, newAffectation)
        setId_affectation(res.data.setId_affectation)
      
        setIsOpen(false)
    }

    return (
        <div className='mt-2 flex flex-col justify-center items-center'>
            {isOpen && (
                <form
                    className='fixed bottom-10 flex flex-col items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-200 w-60 p-4 '
                    onSubmit={(e) => handleAdd(e)} ref={modalRef}
                >
                    <button onClick={closeModal} className='w-full bg-purple-300 h-12 rounded-xl hover:bg-purple-400 border-2 border-purple-700'>Fermer</button>

                    {/* matiere */}
                    <InputElementMatiere
                        title="Matière"
                        setId_matiere={setId_matiere}
                        url={`http://localhost:3001/api/matiere/`}
                    />
                    {/* ens */}
                    <InputElementEnseignant
                        title="Enseignant"
                        setId_ens={setId_ens}
                        url={`http://localhost:3001/api/enseignant/`}
                    />
                    {/* volume horaire */}
                    <input className='mt-4 text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-full'
                        type="number" name="" id=""
                        ref={vh}
                        placeholder='Volume horaire'
                    />
                    {/* tronc comm */}
                    <InputElementTC
                        title="Tronc commun"
                        setId_tronc_commun={setId_tronc_commun}
                        url={`http://localhost:3001/api/troncCommun`}
                    />
                    {/* salle */}
                    <InputElementSalle
                        title="Salle"
                        setId_salle={setId_salle}
                        url={`http://localhost:3001/api/salle/`}
                    />
                    <input
                        type="submit"
                        value="Enregistrer" name="" id=""
                        className='mt-4 h-10 w-56 ajouterEnregistrer w-full'
                    />
                </form>
            )}
            <input type="button"
                value="Ajouter attribution" name="" id=""
                className='ajouterEnregistrer mt-4 h-10 w-60'
                onClick={openModal}
            />
        </div>
    )
}

export default AddBoxGroupDetails