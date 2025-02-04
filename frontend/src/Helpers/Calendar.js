let today = new Date()

export const isSameDay = (date1, date2) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export const FrDate = (curDate) => {
    const options = { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(curDate);
    let dateFormatted = new Intl.DateTimeFormat('fr-FR', options).format(date);
    // Make the first letter uppercase
    dateFormatted = dateFormatted.charAt(0).toUpperCase() + dateFormatted.slice(1);

    return (
        dateFormatted
    )
}

export const generate = (curDate) => {
    //alaina ilay date hanaovana boucle miakatra jusqu daty sabotsy
    let currentDateUp = new Date(curDate);

    const weekDays = [new Date(currentDateUp)];
    for (let i = currentDateUp.getDay(); i < 6; i++) { //6 satria rehefa 5 dia mbola apiana ray andro ilay daty
        currentDateUp.setDate(currentDateUp.getDate() + 1);
        weekDays.push(new Date(currentDateUp));
    }

    let currentDateDown = new Date(curDate);
    for (let i = currentDateDown.getDay(); i > 0; i--) {
        currentDateDown.setDate(currentDateDown.getDate() - 1);
        weekDays.push(new Date(currentDateDown));
    }

    // Parse the date strings into Date objects
    const weekDaysOrdered = weekDays.map(dateString => new Date(dateString));

    // Sort the Date objects
    weekDaysOrdered.sort((a, b) => a - b);
    return weekDaysOrdered
}

export function nextWeek(currentDay) {
    let nextWeekDay = new Date(currentDay)
    nextWeekDay.setDate(nextWeekDay.getDate() + 7)
    return new Date(nextWeekDay)
} 

export function prevWeek(currentDay) {
    let nextWeekDay = new Date(currentDay)
    nextWeekDay.setDate(nextWeekDay.getDate() - 7)
    return new Date(nextWeekDay)
}

console.log(today)
generate(nextWeek(today))
generate(prevWeek(today))