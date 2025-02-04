import React from 'react'
import OccupationDetailItem from '../OccupationDetails/OccupationDetailItem'

function OccupationDetails() {
  return (
    <div className='flex justify-center'>
      <OccupationDetailItem itemTitle="Matière" itemValue="Agroforesterie et gestion de foret agricole"/>
      <OccupationDetailItem itemTitle="Classe" itemValue="Agro M2 DAR"/>
      <OccupationDetailItem itemTitle="Salle" itemValue="Vandelet"/>
      <OccupationDetailItem itemTitle="Heure restante" itemValue="26"/>
    </div>
  )
}

export default OccupationDetails