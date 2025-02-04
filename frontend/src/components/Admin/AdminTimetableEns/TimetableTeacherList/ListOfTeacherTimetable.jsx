import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../Contexts/MyContext'

function ListOfTeacherTimetable({ term, ens }) {
    const [res, setRes] = useState([])
    const { setId_ens } = useContext(MyContext)
    const [selectedId, setSelectedId] = useState(null)
    const getEns = (id_ens) => {
        setId_ens(() => {
            return id_ens
        })
        setSelectedId(id_ens)
        console.log(id_ens)
    }
    useEffect(() => {
        const regexPattern = new RegExp(term, "i");
        setRes(ens.filter((item) => regexPattern.test(item.nom_ens)))
        setId_ens(ens[ens.length - 1].id_ens)
    }, [term])

    return (
        <div className='max-h-80 overflow-auto scrollbar w-60'>
            {res.map((ens) => (
                <div className='flex items-center' key={ens.id_ens}>
                    <div
                        className={
                            `border-b-2 border-gray-300 truncate w-full py-2 px-2 hover:bg-sky-100 cursor-pointer
                            ${ens.id_ens === selectedId ? 'bg-sky-300' : ''}`
                        }
                        onClick={() => getEns(ens.id_ens)}
                        title={ens.nom_ens}
                    >
                        {ens.nom_ens}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfTeacherTimetable