

export function humanizeDate(dateStr){
    if (dateStr){
        let date = new Date(dateStr);
        return date.toLocaleString();
    }
    return null
}