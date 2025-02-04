import axios from 'axios'
import React, { useState } from 'react'

function InputElementSalleTimetable({ setId_salle, title, url }) {
    const [inputValue, setInputValue] = useState("")
    const [itemdata, setItemdata] = useState([])

    const getData = async (value) => {
        const res = await axios.get(url)
        console.log(res.data)
        const result = res.data.filter((salle) => {
            return salle
        })
        setItemdata(result)
    }
    const handleChange = (value) => {
        setInputValue(value)
        getData(value)
        setId_salle(null)
    }

    return (
        <div className='w-full'>
            <input
                className=' mt-4 text-center bg-white border-2 border-sky-500 rounded-lg h-10 pl-2 w-full'
                placeholder={title}
                type="text" name="" id=""
                value={inputValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={(e) => getData(e.target.value)}
            />
            <div className="rounded-md py-4 absolute left-56  bg-sky-100 h-40 overflow-auto scrollbar">
                {
                   itemdata && itemdata.map((item) => (
                        <div
                            className='w-40 m-2 rounded-md hover:bg-sky-300 cursor-pointer p-1 truncate'
                            key={item.id_salle}
                            onClick={() => {
                                setInputValue(item.nom_salle)
                                setId_salle(item.id_salle)
                                setItemdata([])
                            }}

                        >
                            {item.nom_salle}

                        </div>
                    ))
                }
            </div>


        </div>
    )
}

export default InputElementSalleTimetable