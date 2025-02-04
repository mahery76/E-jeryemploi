const pool = require("../../config/dbpg")
const isSameDay = require("../../functions/isSameDay")
const noRoomSlotDuplicate = require("./10_noRoomSlotDuplicate")

const getRoom = async (noRoomSlotDuplicateOccupation) => {

    const Salles = (await pool.query(`SELECT * FROM "Salles"  ORDER BY capacite`)).rows

    // console.table(noRoomSlotDuplicateOccupation)
    // console.table(Salles)

    const occupationWithRoom = []

    // if all of those condition are true at the same time, we don't take the room
    const isSameRoom = (occupation, occupationWithRoom) => {
        const { id_cren, id_salle, date_dispo, id_tronc_commun } = occupation
        const isSameRoom = occupationWithRoom.some(item => (

            // if the date of the current item to check and the date of the current occupation already OK have the same day 
            isSameDay(item.date_dispo, date_dispo) &&
            // if those has the same slot
            item.id_cren === id_cren &&
            // if those has the sane room
            item.id_salle === id_salle &&
            (
                // if those are in a common core curriculum
                (item.id_tronc_commun !== id_tronc_commun)
                ||
                // if those ccc reference is null 
                (id_tronc_commun === null && item.id_tronc_commun === null)
            )
        ))
        return (isSameRoom)
    }


    //iterate throw all occupation
    for (const occupation of noRoomSlotDuplicateOccupation) {
        // if the occupation has already a room by default, then take it
        if (occupation.id_salle !== null) {
            occupationWithRoom.push(occupation)
        }
        else {
            for (let i = 0; i < Salles.length; i++) {
                // if the room is going to fit to the current room
                if (occupation.effectif <= Salles[i].capacite) {
                    // take the room for the current occupation
                    occupation["id_salle"] = Salles[i]["id_salle"]

                    //if the room is already taken then validate the occupation
                    if(!isSameRoom(occupation, occupationWithRoom)){
                        occupationWithRoom.push(occupation)

                        // skip to the next occupation 
                        break;
                    }
                } 
            }
        }
    }
    return occupationWithRoom

}
// const f = async () => {
//     let res = await getRoom()
//     await pool.end()
//     console.table(res)
// }
// f()
module.exports = getRoom