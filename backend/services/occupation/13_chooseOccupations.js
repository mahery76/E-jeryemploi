const pool = require("../../config/dbpg")
const getRoomOccupation = require("./11_getRoom")
const get_occupations_brute = require("./2_occupation_brute")

const chooseOccupations = async () => {

    const getRoomOccupations = await getRoomOccupation()
    
    let choosedOccupations = [...getRoomOccupations]

    choosedOccupations.sort((before, after)  => {
        // return before.id_classe.localeCompare(after.id_classe)
        if(before.id_classe === after.id_classe){
            return before.id_cren.localeCompare(after.id_cren)
        }
        return before.id_classe.localeCompare(after.id_classe)
    })

    choosedOccupations = choosedOccupations.filter(occupation => {
        return(
            // occupation.id_classe === 'g0001'
            occupation.id_ens === 't0003'
            // occupation.id_cren === 's0003'
            // occupation.jour_cren === 'jeudi'
        )
    })

    return choosedOccupations
}

const f = async () => {
    let res = await chooseOccupations()
    await pool.end()
    console.table(res)
}
f()

module.exports = chooseOccupations