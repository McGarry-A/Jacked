import moment from "moment";

export default function getPreviousMondays(depth = 5): string[] {
    const mondayDates = []
    const thisMonday = moment().startOf("week")
    const thisMondayFormatted = thisMonday.format("DD-MM-YYYY")

    mondayDates.push(thisMondayFormatted)

    for (let i = 0; i < depth; i++) {
        const prev = thisMonday.day(-7)
        mondayDates.push(prev.format("DD-MM-YYYY"))
    }

    // ["27-11-2022", "20-11-2022", "13-11-2022", "06-11-2022", "30-10-2022", "23-10-2022"]
    return mondayDates
}