import axios from 'axios'
import React, { useState } from 'react'

function InputElementTC({ setId_tronc_commun, title, url }) {
    const [inputValue, setInputValue] = useState("")
    const [itemdata, setItemdata] = useState([])
    const [troncCommuns, setTroncCommuns] = useState([])

    const getData = async (value) => {
        const res = await axios.get(url)
        console.log(res.data)
        const results = res.data.filter((tc) => {
            return (
                value &&
                tc &&
                tc.nom_tronc_commun.toLowerCase().includes(value.toLowerCase()))
        })
        setItemdata(results)
    }

    const getTc = async (value) => {
        const res = await axios.get(`http://localhost:3001/api/CCAffectation`)
        const results = res.data.filter(() => {
            return(value)
        })
        setTroncCommuns(results)
    }

    const handleChange = (value) => {
        setInputValue(value)
        getData(value)
        //satria lasa vide fa tsy null ilay valeur raha ts misafidy
        setId_tronc_commun(null)
        getTc(value)
    }
    return (
        <div className=' w-full'>
            <input
                className=' mt-4 text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-full'
                placeholder={title}
                type="text" name="" id=""
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
            />
            <div className="rounded-md py-2 absolute left-64 bottom-16 bg-sky-100 h-56 overflow-auto scrollbar">
                {
                    itemdata.map((item) => (
                        <div
                            className='w-40 m-2 hover:bg-sky-300 cursor-pointer p-1 truncate border-b-2 border-sky-300'
                            key={item.id_tronc_commun}
                            onClick={
                                () => {
                                    setInputValue(item.nom_tronc_commun)
                                    setId_tronc_commun(item.id_tronc_commun)
                                    setItemdata([])
                                    setTroncCommuns([])
                                }
                            }
                        >
                            {item.nom_tronc_commun}
                        </div>
                    ))
                }
            </div>
            <div className="rounded-md py-4 absolute right-64 bottom-16 bg-green-100 h-56 overflow-auto scrollbar">
                {
                    troncCommuns.map((item) => (
                        <div
                            className='w-96 m-2 px-3 cursor-pointer gap-x-4 border-b-2 border-green-300 p-1 grid grid-cols-10 justify-center items-center'
                            key={item.id_affectation}
                        >
                            <div title={item.nom_classe} className='truncate col-span-2'>{item.nom_classe}</div>
                            <div title={item.nom_ens} className='truncate col-span-3'>{item.nom_ens}</div>
                            <div title={item.nom_matiere} className='truncate col-span-2'>{item.nom_matiere}</div>
                            <div title={item.nom_salle} className='truncate'>{item.nom_salle}</div>
                            <div title={item.nom_tronc_commun} className='truncate col-span-2'>{item.nom_tronc_commun}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default InputElementTC