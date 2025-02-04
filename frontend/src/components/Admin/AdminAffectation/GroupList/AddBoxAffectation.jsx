import React, { useRef, useState } from 'react'
import { postHttp } from '../../../../Api/httpget';

function AddBoxAffectation() {
  //about model event 
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  };
  const nom_classeRef = useRef()
  const effectif_classeRef = useRef()
  const taux_horRef = useRef()
  const handleAdd = async (e) => {
    e.preventDefault()
    const newClasse = {
      "nom_classe": nom_classeRef.current.value,
      "effectif_classe": effectif_classeRef.current.value,
      "taux_hor": taux_horRef.current.value
    }
    const res = await postHttp(`http://localhost:3001/api/classe`, newClasse)
    setIsOpen(false)
    // window.location = "/admin/AdminAffectation"
  }
  const InputElement = ({ type, title, reference }) => {
    return (
      <div className=' flex flex-col items-center'>
        <input
          ref={reference}
          type={type}
          name="" id=""
          className='mb-4 text-center bg-white border border-sky-700 rounded-lg h-10 pl-2 w-56'
          required
          placeholder={title}
        />
      </div>
    )
  }
  return (
    <div className='mt-12 flex flex-col justify-center items-center static'>
      {isOpen && (
        <form
          onSubmit={(e) => handleAdd(e)} ref={modalRef}
          className='absolute bottom-16 bg-gray-100 rounded-lg border-2 border-gray-200 w-60 p-4 flex flex-col items-center'
        >

          <button onClick={closeModal} className='mb-6 w-full bg-purple-300 h-12 rounded-xl hover:bg-purple-400 border-2 border-purple-700'>Fermer</button>
          <InputElement type="text" title="Nom classe" reference={nom_classeRef} />
          <InputElement type="number" title="Effectif classe" reference={effectif_classeRef} />
          <InputElement type="number" title="Taux horaire" reference={taux_horRef} />
          <input
            type="submit"
            value="Enregistrer" name="" id=""
            className=' mt-4 h-10 w-56 ajouterEnregistrer'
          />
        </form>
      )}
      <input
        type="button"
        value="Ajouter une classe" name="" id=""
        className=' mt-4 h-10 w-60 ajouterEnregistrer'
        onClick={openModal}
      />
    </div>
  )
}

export default AddBoxAffectation