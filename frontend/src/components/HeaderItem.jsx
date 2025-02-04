import React from 'react'
import { NavLink } from 'react-router-dom'

function HeaderItem({ icon, pathlink, itemTitle }) {
    return (<>
        <NavLink
            to={pathlink}
            end
        >
            {({ isActive }) => (
                <div
                    className={isActive ?
                        " mx-4 flex items-center justify-center h-12 border-b-2 border-sky-600 text-sky-600 cursor-pointer" :
                        " mx-4 flex items-center justify-center h-12 rounded-lg hover:bg-sky-100 cursor-pointer"}
                >
                    <div className="px-2">{icon}</div>
                    <div className="
                    pr-2 hidden
                    md:block
                
                    ">{itemTitle}</div>
                </div>
            )}

        </NavLink>
    </>

    )
}

export default HeaderItem