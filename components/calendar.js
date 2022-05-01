import { useState } from "react"
import { useAppContext } from "../global/state"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"


export default function Calendar() {
    const appContext = useAppContext()
    const [day, setDay] = useState(appContext.day)
    const [month, setMonth] = useState(appContext.month)
    const [year, setYear] = useState(appContext.year)

    const [monthPreview, setMonthPreview] = useState(appContext.month)
    const [yearPreview, setYearPreview] = useState(appContext.year)

    const [monthView, setMonthView] = useState(month < 7)

    function CalendarMonths() {
        const m=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let months = []

        if (monthView) {
            months=[]
            for (let i = 1; i <= 5; i++) {
                if (i == monthPreview) {
                    months.push(<div className="rounded-full bg-white text-indigo-300 mr-4 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer">{m[i-1]}</div>)
                }
                else {
                    months.push(
                        <div 
                        className="rounded-full bg-white/40 text-indigo-300 mr-4 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer"
                        onClick={() => {setMonthPreview(i)}}
                        >
                            {m[i-1]}
                        </div>
                    )
                }
            }
            if (6 == monthPreview) {
                months.push(<div className="rounded-full bg-white text-indigo-300 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer">{m[5]}</div>)
            }
            else {
                months.push(
                    <div 
                    className="rounded-full bg-white/40 text-indigo-300 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer"
                    onClick={() => {setMonthPreview(6)}}
                    >
                        {m[5]}
                    </div>
                )
            }
        }
        else {
            months = []
            for (let i = 7; i <= 11; i++) {
                if (i == monthPreview) {
                    months.push(<div className="rounded-full bg-white text-indigo-300 mr-4 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer">{m[i-1]}</div>)
                }
                else {
                    months.push(
                        <div 
                        className="rounded-full bg-white/40 text-indigo-300 mr-4 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer"
                        onClick={() => {setMonthPreview(i)}}
                        >
                            {m[i-1]}
                        </div>
                    )
                }
            }
            if (12 == monthPreview) {
                months.push(<div className="rounded-full bg-white text-indigo-300 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer">{m[11]}</div>)
            }
            else {
                months.push(
                    <div 
                    className="rounded-full bg-white/40 text-indigo-300 px-3 py-1 flex items-center justify-center text-center font-medium text-sm select-none cursor-pointer"
                    onClick={() => {setMonthPreview(12)}}
                    >
                        {m[11]}
                    </div>
                )
            }
        }
        return months
    }

    const firstDOW = new Date(yearPreview + "-" + monthPreview + "-" + 1).getDay()

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate()
    }

    function CalendarDays() {
        let days = []
        for (let i = 1; i <= firstDOW; i++) {
            days.push(<div className="py-1"/>)
        }
        for (let i = 1; i <= daysInMonth(monthPreview, yearPreview); i++) {
            if (day == i && monthPreview == month) {
                days.push(<div className="text-indigo-300 font-medium text-sm select-none text-center cursor-pointer bg-white py-1 rounded-full">{i}</div>)
            }
            else {
                days.push(<div className="text-white font-medium text-sm select-none text-center cursor-pointer hover:bg-white/25 py-1 rounded-full">{i}</div>)
            }
        }
        return days
    }

    return (
        <>
            <section className="h-80 w-[36rem] bg-gradient-to-tl from-blue-400 to-violet-300 rounded-3xl shadow-xl shadow-indigo-400/30 px-10 py-7">

                {/* month selector */}
                <div className="flex justify-between items-center">
                    <FaChevronLeft 
                    className="text-white cursor-pointer"
                    onClick={() => {setMonthView(!monthView)}}
                    />
                    <div className="flex">
                        <CalendarMonths />
                    </div>
                    <FaChevronRight
                    className="text-white cursor-pointer"
                    onClick={() => {setMonthView(!monthView)}}
                    />
                </div>

                <div className="flex items-center h-full pb-8">
                    {/* calendar */}
                    <div className="h-full flex flex-col justify-center w-[55%] px-2">
                        <div className="mt-6 mr-8 grid grid-cols-7 gap-x-1">
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">S</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">M</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">T</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">W</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">T</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">F</div>
                            <div className="text-white font-bold select-none text-center py-1 rounded-full">S</div>
                        </div>
                        <div className="mr-8 grid grid-cols-7 gap-x-1">
                            <CalendarDays/>
                        </div>
                    </div>

                    <div className="h-full w-[45%] px-2 pt-12 pb-6 flex flex-col justify-between items-center">
                        <ul>
                            <li>Calorie Goal</li>
                            <li>Macros Goal</li>
                            <li>Weight Recorded</li>
                        </ul>
                        <div>yee</div>
                    </div>
                </div>
            </section>
        </>
    )
}