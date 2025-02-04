const isSameDay = require("../../functions/isSameDay");

const isGroupeCourseTeacherSlotdayDuplicate = (occupation, osFiltre) => {
    const { id_classe, id_matiere, id_ens, date_dispo,id_cren, jour_cren } = occupation;

    // pas plus de deux slots pour GCT dans une journee
    const GCTDuplicateCount = osFiltre.filter((item) => (
        item.id_classe === id_classe &&
        item.id_matiere === id_matiere &&
        item.id_ens === id_ens &&
        isSameDay(item.date_dispo, date_dispo) &&
        item.id_cren !== id_cren &&
        item.jour_cren === jour_cren
    )).length;
    return GCTDuplicateCount >= 2;
};
module.exports = isGroupeCourseTeacherSlotdayDuplicate;