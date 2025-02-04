import React, { useEffect, useRef, useState } from 'react'
import { postHttp } from '../../../../Api/httpget';


function AddBox() {
    // about model event
    const [isOpen, setIsOpen] = useState(false)
    const modalRef = useRef(null)
    const openModal = () => {
        setIsOpen(true);
        console.log(isOpen)
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    // about the input
    const emailRef = useRef()
    const mdpRef = useRef()
    const nomRef = useRef()
    const contactRef = useRef()
    const tauxRef = useRef()

    const handleAdd = async (e) => {
        e.preventDefault()
        const newEns = {
            "email_user": emailRef.current.value,
            "mdp_user": mdpRef.current.value,
            "nom_ens": nomRef.current.value,
            "coordonnees": contactRef.current.value,
        }
        const res = await postHttp(`http://localhost:3001/api/enseignant`, newEns)
        console.log(res)
        setIsOpen(false)
        window.location = "/admin/AdminTeacher"
    
    }
    const InputElement = ({ type, title, reference }) => {
        return (
            <div className=' flex flex-col items-center'>
                <div className='font-bold text-sky-700'>{title}</div>
                <input
                    ref={reference}
                    type={type}
                    name="" id=""
                    className='text-center bg-white border border-sky-700 rounded-lg h-10 pl-2 w-56'
                    required
                />
            </div>
        )
    }
    return (
        <div className='mt-12 flex flex-col justify-center items-center static'>
            {isOpen && (
                <form onSubmit={(e) => handleAdd(e)} ref={modalRef} className='fixed bottom-8 bg-gray-100 rounded-lg border-2 border-gray-200 w-60 p-4 flex flex-col items-center'>

                    <button onClick={closeModal} className='w-full bg-purple-300 h-12 rounded-xl hover:bg-purple-400 border-2 border-purple-700'>Fermer</button>

                    <InputElement type="email" title="Email" reference={emailRef} />
                    <InputElement type="text" title="Mot de passe" reference={mdpRef} />
                    <InputElement type="text" title="Nom" reference={nomRef} />
                    <InputElement type="text" title="Contact" reference={contactRef} />

                    <input
                        type="submit"
                        value="Enregistrer" name="" id=""
                        className=' mt-4 h-10 w-56 ajouterEnregistrer'
                    />
                </form>
            )}
            <input
                type="button"
                value="Ajouter enseignant" name="" id=""
                className=' mt-4 h-10 w-60 ajouterEnregistrer'
                onClick={openModal}
            />
        </div>
    )
}
export default AddBox