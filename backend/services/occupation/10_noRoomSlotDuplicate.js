const pool = require("../../config/dbpg")
const isSameDay = require("../../functions/isSameDay")
const get_occupations_filtered = require("./9_occupation_filtered")

// this will remove all occupations that have the duplicate room Slot by default
// before assigning a room to all occupations without room by default
const noRoomSlotDuplicate = async (occupationWithoutRoom) => {

    // console.table(occupationWithoutRoom)
    // console.table(Salles)
    const occupationWithRoom = []

    //filtre room
    const isSameRoom = (occupation, occupationWithRoom) => {
        const { id_cren, id_salle, date_dispo, id_tronc_commun } = occupation
        const isSameRoom = occupationWithRoom.some(item => (
            id_salle !== null &&
            isSameDay(item.date_dispo, date_dispo) &&
            item.id_cren === id_cren &&
            item.id_salle === id_salle &&
            (
                (item.id_tronc_commun !== id_tronc_commun)
                ||
                (id_tronc_commun === null && item.id_tronc_commun === null)
            )
        ))
        return (isSameRoom)
    }
    for (const occupation of occupationWithoutRoom) {
        if (
            !isSameRoom(occupation, occupationWithRoom)
        ) {
            occupationWithRoom.push(occupation)
        }
    }

    return occupationWithRoom
}
// const f = async () => {
//     let res = await noRoomSlotDuplicate()
//     await pool.end()
//     console.table(res)
// }
// f()
module.exports = noRoomSlotDuplicate


