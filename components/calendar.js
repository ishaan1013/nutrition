import { useState } from "react"
import { useAppContext } from "../global/state"


export default function Calendar() {
    const appContext = useAppContext()
    const [day, setDay] = useState(appContext.day)
    const [month, setMonth] = useState(appContext.month)
    const [year, setYear] = useState(appContext.year)
    // ! whenever getting new MONTH add 1 for the correct value

    const firstDOW = new Date(year + "-" + month + "-" + 1).getDay()

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate()
    }

    // July
    daysInMonth(7,2009) // 31
    // February
    daysInMonth(2,2009) // 28
    daysInMonth(2,2008) // 29

    return (
        null
    )
}