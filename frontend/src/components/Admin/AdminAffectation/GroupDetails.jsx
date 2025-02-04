import React, { useContext, useEffect, useState } from 'react'
import AddBoxGroupDetails from './GroupDetails/AddBoxGroupDetails'
import GroupInfo from './GroupDetails/GroupInfo'
function GroupDetails() {
  
  return (
    <div className=" my-8 bg-white p-2 rounded-xl flex flex-col items-center">
      {/* effectif layout*/}
      <GroupInfo />
      <AddBoxGroupDetails />
    </div>
  )
}
export default GroupDetails