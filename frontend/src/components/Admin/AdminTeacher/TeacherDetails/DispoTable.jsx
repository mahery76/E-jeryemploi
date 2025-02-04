import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import DispoJour from './DispoTable/DispoJour'
import { FrDate, generate, nextWeek, prevWeek } from '../../../../Helpers/Calendar'
import { getHttp } from '../../../../Api/httpget'

function DispoTable() {
    const [currentDay, setCurrenDay] = useState(new Date())
    const [weekDays, setWeekDays] = useState([])
    useEffect(() => {
        setWeekDays(generate(currentDay))
    }, [currentDay])

    const { data: crens, error } = getHttp(`http://localhost:3001/api/creneau`)
    return (
        <div className='flex flex-col items-center'>
            <div className="font-bold text-lg my-6 text-sky-700">Disponibilités de l'enseignant</div>

            <div className="dateNavigate flex justify-between mb-2 w-full">
                <div
                    className='ajouterEnregistrer w-12  h-8  flex justify-center'
                    onClick={() => { setCurrenDay(prevWeek(currentDay)) }}
                >
                    <BackwardIcon className='w-5' />
                </div>

                <div>Semaine du <span className='text-sky-700'> {weekDays[1] && FrDate(weekDays[1])}</span></div>

                <div
                    className='ajouterEnregistrer w-12 h-8 flex justify-center'
                    onClick={() => { setCurrenDay(nextWeek(currentDay)) }}
                > <ForwardIcon className='w-5' />
                </div>
            </div>

            <div className='flex'>

                <div className="stots mr-2">
                    <div className='slot mb-6 text-xs '>Créneaux</div>
                    {error && <div>{error}</div>}
                    {
                        crens && crens.map((cren) => (
                            <div key={cren.id_cren} className='slot text-xs h-12'>{cren.valeur_cren}</div>
                        ))
                    }
                </div>

                <DispoJour jour="Lun" date={new Date(weekDays[1])} />
                <DispoJour jour="Mar" date={new Date(weekDays[2])} />
                <DispoJour jour="Mer" date={new Date(weekDays[3])} />
                <DispoJour jour="Jeu" date={new Date(weekDays[4])} />
                <DispoJour jour="Ven" date={new Date(weekDays[5])} />
                <DispoJour jour="Sam" date={new Date(weekDays[6])} />
            </div>
        </div>
    )
}
export default DispoTable