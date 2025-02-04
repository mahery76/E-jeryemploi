import React, { useEffect, useState } from 'react'
import DispoItemTest from './DispoJour/DispoItemTest'
import { getHttp } from '../../../../../Api/httpget'

function DispoJour({ jour, date }) {
    const { data: crens, error } = getHttp(`http://localhost:3001/api/creneau`)

    if(error){
        return <div>{error}</div>
    }
    if(crens){
        return (
            <div className=" mr-2 w-10">
                <div className='jour_cren text-xs mb-2'>{jour} {date.getDate()}</div>
                {
                    crens.map((cren) => (
                        <DispoItemTest id_cren={cren.id_cren} key={cren.id_cren} date={date}/>
                    ))
                }
            </div>
        )
    }
}

export default DispoJour