import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../../../../../Contexts/MyContext'
import axios from 'axios'
import { isSameDay } from '../../../../../../Helpers/Calendar'
import { deleteHttp, postHttp } from '../../../../../../Api/httpget'

function DispoItemTest({ id_cren, date }) {
    const [istaken, setIsTaken] = useState(false)
    const [dispos, setDispos] = useState([])
    const [isDispoFound, setIsDispoFound] = useState({})
    const { id_ens } = useContext(MyContext)

    const getDispos = async () => {
        if(id_ens){
            const res = await axios.get(`http://localhost:3001/api/dispoECD?id_cren=${id_cren}&id_ens=${id_ens}`)
            setDispos(() => res.data)
        }
    }

    useEffect(() => {
        getDispos()
    }, [id_ens, istaken])

    useEffect(() => {
        const dispoFound = dispos.find(function (dispo) {
            return (
                isSameDay(new Date(dispo.date_dispo), date) &&
                dispo.id_cren === id_cren &&
                dispo.id_ens === id_ens
            )
        })
        setIsTaken(!!dispoFound)
        setIsDispoFound(dispoFound)
    }, [dispos, id_ens, id_cren, date])

    const handleChange = async () => {
        if (istaken) {
            const suppr = await deleteHttp(`http://localhost:3001/api/dispo/${isDispoFound.id_dispo}`)
            setIsTaken(false)

        }
        else {
            const data = {
                id_ens: id_ens,
                id_cren: id_cren,
                date_dispo: date
            }
            const insert = await postHttp(`http://localhost:3001/api/dispo/`, data)
            setIsTaken(true)
        }
    }

    // useEffect(()=> {
    //     getDispos()
    // },[istaken])

    return (
        <div className='slot flex items-center justify-center h-12'>
            <input
                type="checkbox"
                className='w-4 h-4 cursor-pointer'
                checked={istaken}
                onChange={handleChange}
            />
        </div>
    )
}

export default DispoItemTest