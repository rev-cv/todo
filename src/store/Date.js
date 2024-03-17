import {writable} from 'svelte/store';

export const date = writable(new Date());
export const decade = writable(getDecByDate(new Date()));
export const year = writable(new Date().getFullYear());

export const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export const shortMonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

export const shortDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getDecadesForYear(y=2024) {

    let currentMonth = 1;
    let currentDecMonth = 1;

    let result = [];

    for (let currentDecade = 1; currentDecade <= 36; currentDecade++) {

        let sDay;
        let fDay;

        switch (currentDecMonth) {
            case 1:
                sDay = 1; fDay = 10; break;
            case 2:
                sDay = 11; fDay = 20; break;
            case 3:
                sDay = 21; fDay = new Date(y, currentMonth-1, 0).getDate(); break;
            default:
                break;
        }

        result.push({
            "start": new Date(y, currentMonth-1, sDay),
            "finish": new Date(y, currentMonth-1, fDay),
            "nameMonth": shortMonthNames[currentMonth - 1],
            "decadeOfMonth": currentDecMonth,
            "decadeOfYear": currentDecade,
        })

        ++currentDecMonth;
        if (currentDecMonth > 3){
            currentDecMonth = 1;
            ++currentMonth;
        }
    }

    return result
}


export function getDecOfMonth (dec=1) {
    return ["Ⅲ", "Ⅰ", "Ⅱ"][dec % 3]
}

export function getMonthByDec (dec=1) {
    return shortMonthNames[Math.ceil(dec / 3) - 1]
}

// @ts-ignore
export function getDecByDate(date){
    const d = new Date(date);
    const da = d.getDate();
    const cmd = da < 11 ? 1 : da < 21 ? 2 : 3;
    return [d.getFullYear(), d.getMonth() * 3 + cmd]
}
