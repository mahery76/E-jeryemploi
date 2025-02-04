import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../Contexts/MyContext'
import { deleteHttp } from '../../../../Api/httpget'

function ListOfTeacher({ enseignants, term, setIsMenuList }) {
    const [res, setRes] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    //useContext for getting the id of teacher to play alongside the application
    const { setId_ens } = useContext(MyContext)
    const getEns = (id_ens) => {

        setIsMenuList(() => false)
        setId_ens(() => {
            return id_ens
        })
        setSelectedId(id_ens)
        console.log(id_ens)
    }
    // update the res everytime terms updates
    useEffect(() => {
        const regexPattern = new RegExp(term, "i");
        setRes(enseignants.filter((item) => regexPattern.test(item.nom_ens)));
        setId_ens(enseignants[0].id_ens)
    }, [term]);


    const handleDelete = async (id_ens) => {
        const confirmed = window.confirm('Voulez-vous bien supprimer?');
        if (confirmed) {
          const deleteEns = await deleteHttp(`http://localhost:3001/api/enseignant/${id_ens}`)
          setRes(res.filter(item => item.id_ens !== id_ens))
        }
    }

    return (

        // ilay list of teacher 
        <div className="
        overflow-auto scrollbar 
        w-full
        md:max-h-80 md:w-60 
        ">
            
            {res.map((ens) => (
                <div className='flex items-center' key={ens.id_ens}>
                    <div
                        className={`
                        truncate w-5/6 py-2 px-2 rounded-lg hover:bg-sky-100 cursor-pointer
                        ${ens.id_ens === selectedId ? 'bg-sky-300' : ''}
                        `}
                        onClick={() => getEns(ens.id_ens)}
                        title={ens.nom_ens}
                    >
                        {ens.nom_ens}
                    </div>
                    <div>
                        <TrashIcon
                            className='w-5 m-2 cursor-pointer stroke-red-800'
                            onClick={() => handleDelete(ens.id_ens)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfTeacher