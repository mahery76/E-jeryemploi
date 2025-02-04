const sameAffectation = (occupation, osFiltre) => {
    const { id_classe, id_matiere, id_ens } = occupation
    const sameAffectationFound = [...osFiltre].reverse().find((item) => {
        return item.id_classe === id_classe &&
        item.id_matiere === id_matiere &&
        item.id_ens === id_ens
    })
    return sameAffectationFound
}
module.exports = sameAffectation