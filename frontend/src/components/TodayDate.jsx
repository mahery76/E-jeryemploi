import React from 'react'

function TodayDate() {
    const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date();
    const dateFormatted = new Intl.DateTimeFormat('fr-FR', options).format(date);

    return (
        <>{dateFormatted}</>
    )
}

export default TodayDate