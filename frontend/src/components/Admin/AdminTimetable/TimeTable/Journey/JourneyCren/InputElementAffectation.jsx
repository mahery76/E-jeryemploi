import axios from 'axios'
import React, { useContext, useState } from 'react'
import { ClasseContext } from '../../../../../../Contexts/MyContext'


function InputElementAffectation({ setId_matiere, setId_ens, setId_tronc_commun, title }) {
  const [inputValue, setInputValue] = useState("")
  const [itemdata, setItemdata] = useState([])
  const { id_classe } = useContext(ClasseContext)


  const getData = async (value) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/GroupAffectation/${id_classe}`)
      const result = res.data.filter((affec) => {
        return (affec)
      })

      setItemdata(result)
    } catch (err) {
      console.error(err.message)
    }
  }
  // onchange input affectation
  const handleChange = (value) => {
    setInputValue(value)
  }

  // onchange choose one affectation from list of affectation
  const handleChoose = async (choosedValue, id_affectation) => {
    const res = await axios.get(`http://localhost:3001/api/Affectation/${id_affectation}`)
    const results = res.data
    setId_ens(results.id_ens)
    setId_tronc_commun(results.id_tronc_commun)
    setId_matiere(results.id_matiere)
    
    setInputValue(choosedValue)
    setItemdata([])
  }

  return (
    <div className='w-full'>
      <input
        className=' mt-4 text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-full'
        type="text"
        placeholder={title}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={(e) => getData(e.target.value)}
      />
      <div className="rounded-md py-4 absolute left-56 bottom-32 bg-sky-100 h-40 overflow-auto scrollbar">
        {
          itemdata && itemdata.map((item) => (
            <div
            className='w-40 m-2 rounded-md hover:bg-sky-300 cursor-pointer p-1 truncate'
            key={item.id_affectation}
            onClick={() => handleChoose(item.nom_matiere, item.id_affectation)}
            >
              {item.nom_matiere}
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default InputElementAffectation