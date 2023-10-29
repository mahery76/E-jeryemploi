const pool = require("../../config/dbpg")
const get_occupations_brute = require("./2_occupation_brute");
const isGroupeCourseTeacherSlotdayDuplicate = require("./3_isGroupeCourseTeacherSlotdayDuplicate");
const isGroupeSlotDuplicate = require("./4_isGroupeSlotDuplicate");
const isTeacherSlotDuplicate = require("./5_isTeacherSlotDuplicate");
const isTroncCommun = require("./6_isTroncCommun");
const isVhzero = require("./7_vh_restantes");
const sameAffectation = require("./8_isSameAffectation");

// Eviter l'apparition des cours differents dans le meme classe, meme ens, et meme heures 

const get_occupations_filtered = async (occupationsBrute) => {
    // console.table(occupationsBrute)
    const osFiltre = [];

    for (const occupation of occupationsBrute) {
        if (
            // isTroncCommun(occupation, osFiltre)
            // &&
            !isTeacherSlotDuplicate(occupation, osFiltre)
            && 
            !isGroupeSlotDuplicate(occupation, osFiltre)
            &&
            !isGroupeCourseTeacherSlotdayDuplicate(occupation, osFiltre)
            &&
            !isVhzero(occupation,osFiltre)
        ){
            if(sameAffectation(occupation, osFiltre)){   
                occupation.vh_restante = sameAffectation(occupation, osFiltre).vh_restante - 2
                osFiltre.push(occupation);
            }
            else if(!sameAffectation(occupation, osFiltre)){
                occupation.vh_restante = occupation.vh_restante - 2
                osFiltre.push(occupation);
            }
        }   
    }
    console.table(osFiltre)
    return osFiltre
}
// const f = async () => {
//     let res = await get_occupations_filtered()
//     console.table(res)
//     await pool.end()
// }
// f()

module.exports = get_occupations_filtered
