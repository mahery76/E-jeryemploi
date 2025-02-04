const isVhzero = (occupation, osFiltre) => {
    const { id_classe, id_matiere, id_ens } = occupation
    const sameAffectationFound = [...osFiltre].reverse().find((item) => {
        return item.id_classe === id_classe &&
        item.id_matiere === id_matiere &&
        item.id_ens === id_ens
    })
    if(sameAffectationFound){
        return sameAffectationFound.vh_restante === 0
    }
}
module.exports = isVhzero
