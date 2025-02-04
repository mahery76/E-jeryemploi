import axios from 'axios'
import React, { useState } from 'react'

function inputElementEnseignant({setId_ens, url, title}) {
    const [inputValue, setInputValue] = useState("")
    const [itemdata, setItemdata] = useState([])
    const getData = async (value) => {
        const res = await axios.get(url)
        console.log(res.data)
        const results = res.data.filter((ens) => {
            return (
                value &&
                ens &&
                ens.nom_ens.toLowerCase().includes(value.toLowerCase()))
        })
        setItemdata(results)
    }
    const handleChange = (value) => {
        setInputValue(value)
        getData(value)
        //satria lasa vide fa tsy null ilay valeur raha ts misafidy
        setId_ens(null)
    }
    return (
        <div className='w-full'>
            <input
                className=' mt-4 text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-full'
                placeholder={title}
                type="text" name="" id=""
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                required
            />
               <div className="rounded-md py-4 absolute left-64 bottom-16 bg-sky-100 h-56 overflow-auto scrollbar">
                {
                    itemdata.map((item) => (
                        <div
                            className='w-40 m-2 rounded-md hover:bg-sky-300 cursor-pointer p-1 truncate'
                            key={item.id_ens}
                            onClick={
                                ()=> {
                                    setInputValue(item.nom_ens)
                                    setId_ens(item.id_ens)
                                    setItemdata([])
                                }
                            }
                        >
                            {item.nom_ens}
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default inputElementEnseignant