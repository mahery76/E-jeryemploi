import React, { useContext, useEffect, useState } from 'react'
import { ClasseContext } from '../../../../Contexts/MyContext'

function ListOfGroupTimetable({ classes, term }) {
    const [res, setRes] = useState([])
    const [selectedId, setSelectedId] = useState(null)

    //useContext for getting the id of teacher to play alongside the application
    const { setId_classe } = useContext(ClasseContext)
    const getClasse = (id_classe) => {
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
        setId_classe(classes[0].id_classe)
    }, [term]);

    return (
        
            <div className="listOfTeacher max-h-80 overflow-auto scrollbar w-60 ">
                {res.map((classe) => (
                    <div className='flex items-center' key={classe.id_classe}>
                        <div
                            className={
                                `border-b-2 border-gray-300 truncate w-full py-2 px-2 hover:bg-sky-100 cursor-pointer
                                ${classe.id_classe === selectedId ? 'bg-sky-300' : ''}`
                            }
                            onClick={() => getClasse(classe.id_classe)}
                        >
                            {classe.nom_classe}
                        </div>
                    </div>
                ))}
            </div>
    )
}
export default ListOfGroupTimetable