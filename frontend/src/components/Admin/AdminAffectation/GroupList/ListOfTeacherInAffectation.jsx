import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../Contexts/MyContext'

function ListOfTeacherInAffectation({ enseignants, term }) {
    const [res, setRes] = useState([])

    //useContext for getting the id of teacher to play alongside the application
    const { setId_ens } = useContext(MyContext)
    const getEns = (id_ens) => {
        setId_ens(() => {
            return id_ens
        })
        console.log(id_ens)
    }

    // update the res everytime terms updates
    useEffect(() => {
        const regexPattern = new RegExp(term, "i");
        setRes(enseignants.filter((item) => regexPattern.test(item.nom_ens)));
        setId_ens(enseignants[0].id_ens)
    }, [term]);
    
    return (
        <div className="max-h-80 overflow-auto scrollbar w-60 ">
            {res.map((ens) => (
                <div className='flex items-center' key={ens.id_ens}>
                    <div
                        className={'truncate w-5/6 py-2 px-2 rounded-lg hover:bg-sky-100 cursor-pointer'}
                        onClick={() => getEns(ens.id_ens)}
                    >
                        {ens.nom_ens}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default ListOfTeacherInAffectation