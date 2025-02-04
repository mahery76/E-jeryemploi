import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { ClasseContext} from '../../../../Contexts/MyContext'
import { deleteHttp } from '../../../../Api/httpget'

function ListOfTeacher({ classes, term, setIsMenuList }) {
    const [res, setRes] = useState([])
    const [selectedId, setSelectedId] = useState(null)


    //useContext for getting the id of teacher to play alongside the application
    const { setId_classe } = useContext(ClasseContext)
    const getClasse = (id_classe) => {
        setIsMenuList(() => false)
        setId_classe(() => {
            return id_classe
        })
        setSelectedId(id_classe)
        console.log(id_classe)
    }

    // update the res everytime terms updates
    useEffect(() => {
        const regexPattern = new RegExp(term, "i");
        setRes(classes.filter((item) => regexPattern.test(item.nom_classe)));
        setId_classe(classes[classes.length - 1].id_classe)
    }, [term]);



    const handleDelete = async (id_classe) => {
        const confirmed = window.confirm('Voulez-vous bien supprimer?');
        if (confirmed) {
            const deleteClasse = await deleteHttp(`http://localhost:3001/api/classe/${id_classe}`)
            setRes(res.filter(item => item.id_classe !== id_classe))
        }
    }

    return (
        <div className="listOfTeacher max-h-80 overflow-auto scrollbar w-60 ">
            {res.map((classe) => (
                <div className='flex items-center' key={classe.id_classe}>
                    <div
                        className={`truncate w-5/6 py-2 px-2 rounded-lg hover:bg-sky-100 cursor-pointer
                        ${classe.id_classe === selectedId ? 'bg-sky-300' : ''}`}
                        onClick={() => getClasse(classe.id_classe)}
                    >
                        {classe.nom_classe}
                    </div>
                    <div>
                        <TrashIcon
                            className='w-5 m-2 cursor-pointer stroke-red-800'
                            onClick={() => handleDelete(classe.id_classe)}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListOfTeacher