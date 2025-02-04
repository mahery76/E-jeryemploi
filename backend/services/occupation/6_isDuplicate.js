const isSameDay = require("../../functions/isSameDay");

const isDuplicate = (occupation, osFiltre) => {
    const {id_classe, id_matiere, id_ens, id_cren, date_dispo, id_tronc_commun } = occupation;

    const isDuplicate = osFiltre.some((item) => (
        item.id_classe === id_classe &&
        item.id_ens === id_ens &&
        item.id_cren === id_cren &&
        isSameDay(item.date_dispo, date_dispo)
    ));

    return (isDuplicate)
};

module.exports = isDuplicate