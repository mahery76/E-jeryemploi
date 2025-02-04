import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../../../Contexts/MyContext'
import { deleteHttp, getHttp, postHttp } from '../../../../../../Api/httpget'
import { isSameDay } from '../../../../../../Helpers/Calendar'

function DispoItem({ id_cren, date }) {
    const [istaken, setIsTaken] = useState(false)
    const [isDispoFound, setIsDispoFound] = useState({})
    

    const { id_ens } = useContext(MyContext)
    let { data: dispos, error } = getHttp(`http://localhost:3001/api/dispoECD?id_cren=${id_cren}&id_ens=${id_ens}`)

    const handleChange = async () => {
        try {
            if (istaken) {
                console.log(isDispoFound)
                const suppr = await deleteHttp(`http://localhost:3001/api/dispo/${isDispoFound.id_dispo}`)
                dispos = dispos.filter(item => (item.id_dispo !== isDispoFound))
                setIsTaken(false)
            } else {
                const data = {
                    id_ens: id_ens,
                    id_cren: id_cren,
                    date_dispo: date
                }
                const insert = await postHttp(`http://localhost:3001/api/dispo/`, data)
                setIsTaken(true)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        if (dispos) {
            const dispoFound = dispos.find(function (dispo) {
                return (
                    isSameDay(new Date(dispo.date_dispo), date) &&
                    dispo.id_cren === id_cren &&
                    dispo.id_ens === id_ens
                )
            })
            setIsTaken(!!dispoFound)
            setIsDispoFound(dispoFound)
        }
    }, [id_ens, id_cren, date])

    return (
        <div className='slot flex items-center justify-center h-10'>
            <input
                type="checkbox"
                className='w-4 h-4 cursor-pointer'
                checked={istaken}
                onChange={handleChange}
            />
        </div>
    )
}

export default DispoItem