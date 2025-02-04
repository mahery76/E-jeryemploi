const isSameDay = require("../../functions/isSameDay");

const isTeacherSlotDuplicate = (occupation, osFiltre) => {
    const { id_ens, id_cren, date_dispo,id_tronc_commun } = occupation;

    const isTSDuplicate = osFiltre.some((item) => (
        item.id_ens === id_ens &&
        item.id_cren === id_cren &&
        isSameDay(item.date_dispo, date_dispo) &&
        (
            (item.id_tronc_commun === null)
            ||
            (item.id_tronc_commun !== id_tronc_commun)
        )
    ));

    return (isTSDuplicate)
};

module.exports = isTeacherSlotDuplicate; 