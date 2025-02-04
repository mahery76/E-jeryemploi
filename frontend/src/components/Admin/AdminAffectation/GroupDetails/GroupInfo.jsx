import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useContext } from 'react'
import { ClasseContext } from '../../../../Contexts/MyContext'
import { getHttp } from '../../../../Api/httpget'

function GroupInfo() {
    const { id_classe } = useContext(ClasseContext)
    const { data, error } = getHttp(`http://localhost:3001/api/group/${id_classe}`)
    if (!data) {
        return <div>Loading...</div>;
    }
    // If there's an error, render an error message
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="EffectifLayout flex flex-col items-center justify-center">
            <div className='text-sky-700 font-bold text-lg my-4 '>Caractéristiques classe</div>
            <div className='w-full'>
                {/* nom de la classe */}
                <div className='flex  w-full justify-between'>
                    <div className="text-sky-700 font-bold">
                        Nom
                    </div>
                    <div className="flex items-center mb-4">
                            {data.nom_classe}
                    </div>
                </div>
                {/* Effectif de la classe */}
                <div className='flex w-full justify-between'>
                    <div className=" text-sky-700 font-bold">
                        Effectif
                    </div>
                    <div className="effectifModif flex items-center mb-4">
                        <div>{data.effectif_classe}</div>
                    </div>
                </div>
                {/* Taux horaire */}
                <div className='flex flex-col w-full justify-between'>
                    <div className=" text-sky-700 font-bold">
                        Taux horaire
                    </div>
                    <div className="effectifModif flex items-center mb-4">
                        <div>{data.taux_hor}</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default GroupInfo