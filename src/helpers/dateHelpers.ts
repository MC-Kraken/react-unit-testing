import { days, months } from "../enums/dates";

export function formatDate(date: Date | null) {
    let formattedDate = new Date(date!.toString());
    return `${days[formattedDate.getDay()]} ${months[formattedDate.getMonth()]} ${formattedDate.getDate()}`;
}