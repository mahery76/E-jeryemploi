const isSameDay = require("../../functions/isSameDay");
const isGroupeSlotDuplicate = (occupation, osFiltre) => {
    const { id_classe, date_dispo, id_cren } = occupation;

    return osFiltre.some((item) => (
        item.id_classe === id_classe &&
        item.id_cren === id_cren &&
        isSameDay(item.date_dispo, date_dispo)
    ));
};
module.exports = isGroupeSlotDuplicate;