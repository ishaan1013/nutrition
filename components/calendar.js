import { useState } from "react"
import { useAppContext } from "../global/state"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox, MdOutlineIndeterminateCheckBox } from "react-icons/md"


export default function Calendar() {
    const appContext = useAppContext()
    const [day, setDay] = useState(appContext.sharedState.day)
    const [monthView, setMonthView] = useState(appContext.sharedState.month < 7)
    const [monthPreview, setMonthPreview] = useState(appContext.sharedState.month)
    const [yearPreview, setYearPreview] = useState(appContext.sharedState.year)

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

    const current = new Date()
    const currentDay = (
        day == current.getDate() &&
        monthPreview == current.getMonth() + 1 &&
        yearPreview == current.getFullYear()
    )

    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate()
    }

    function CalendarDays() {
        function changeDay(x) {
            setDay(x)
            appContext.changeMonthContext(monthPreview)
            appContext.changeYearContext(yearPreview)
            appContext.changeDayContext(x)
        }

        let days = []
        for (let i = 1; i <= firstDOW; i++) {
            days.push(<div className="py-1"/>)
        }
        for (let i = 1; i <= daysInMonth(monthPreview, yearPreview); i++) {
            if (appContext.sharedState.day == i && monthPreview == appContext.sharedState.month && yearPreview == appContext.sharedState.year) {
                days.push(
                    <div className="text-indigo-300 font-medium text-sm select-none text-center cursor-pointer bg-white py-1 rounded-full">
                        <span
                        className={(i == current.getDate() && monthPreview == current.getMonth() + 1 && yearPreview == current.getFullYear())
                             ? "font-bold" : "font-medium"}
                        >{i}</span>
                    </div>
                )
            }
            else {
                days.push(
                    <div 
                    className="text-white font-medium text-sm select-none text-center cursor-pointer hover:bg-white/40 py-1 rounded-full"
                    onClick={() => {changeDay(i)}}
                    >
                        <span
                        className={(i == current.getDate() && monthPreview == current.getMonth() + 1 && yearPreview == current.getFullYear())
                             ? "font-bold" : "font-medium"}
                        >{i}</span>
                    </div>
                )
            }
        }
        return days
    }

    const before = (
        parseInt(appContext.sharedState.year) < current.getFullYear() || 
        appContext.sharedState.year == current.getFullYear() && parseInt(appContext.sharedState.month) < current.getMonth() + 1 ||
        appContext.sharedState.year == current.getFullYear() && appContext.sharedState.month == current.getMonth() + 1 && appContext.sharedState.day < current.getDate()
    )
    function Checkbox() { 
        if (before) {
            return <MdOutlineIndeterminateCheckBox className="mr-2" />
        }
        else {
            return <MdOutlineCheckBoxOutlineBlank className="mr-2" />
        }
    }

    return (
        <>
            <p>{appContext.sharedState.day}-{appContext.sharedState.month}-{appContext.sharedState.year}</p>
            <section className="h-80 w-[36rem] bg-gradient-to-tl from-blue-400 to-violet-300 rounded-3xl shadow-xl shadow-indigo-400/40 px-10 py-7">

                {/* month selector */}
                <div className="flex justify-between items-center">
                    <FaChevronLeft 
                    className="text-white cursor-pointer hover:bg-white/20 p-[0.3rem] h-[1.6rem] w-[1.6rem] rounded-full"
                    onClick={() => {setMonthView(!monthView)}}
                    />
                    <div className="flex">
                        <CalendarMonths />
                    </div>
                    <FaChevronRight
                    className="text-white cursor-pointer hover:bg-white/20 p-[0.3rem] h-[1.6rem] w-[1.6rem] rounded-full"
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

                    <div className="h-full w-[45%] px-2 pt-6 pb-[4.5rem] flex flex-col justify-between items-center">
                        <div className="w-2/3 flex justify-between items-center bg-white/[15%] rounded-full px-2 py-1">
                            <FaChevronLeft 
                            className="text-white cursor-pointer"
                            onClick={() => {setYearPreview(String(parseInt(yearPreview)-1))}}
                            />
                            <div className="text-white font-semibold select-none">
                                {yearPreview}
                            </div>
                            <FaChevronRight
                            className="text-white cursor-pointer"
                            onClick={() => {setYearPreview(String(parseInt(yearPreview)+1))}}
                            />
                        </div>
                        <ul>
                            <li className="flex items-center text-white font-medium select-none">
                                <Checkbox/>
                                thing 1
                            </li>
                            <li className="flex items-center text-white font-medium select-none">
                                <Checkbox/>
                                thing 2
                            </li>
                            <li className="flex items-center text-white font-medium select-none">
                                <Checkbox/>
                                thing 3
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}