import React from 'react'
import { getHttp } from '../../../../Api/httpget'
import JourneyCren from './Journey/JourneyCren'

function Journey({ date, isGenerated }) {
    const { data: crens, error } = getHttp(`http://localhost:3001/api/creneau`)
    if (error) {
        return <div>{error}</div>
    }
    if (crens) {
        return (
            <div className="">
                {
                    crens.map((cren) => (
                        <JourneyCren  
                        id_cren={cren.id_cren} 
                        key={cren.id_cren} 
                        date={date}
                        isGenerated={isGenerated} 
                        />
                    ))
                }
            </div>
        )
    }
}

export default Journey