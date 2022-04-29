import { useState } from "react"
import { useAppContext } from "../global/state"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"


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
        <>
            <section className="h-72 w-1/3 bg-gradient-to-tl from-blue-400 to-violet-300 rounded-3xl shadow-xl shadow-indigo-400/30 px-10 py-7">
                <div className="flex justify-between items-center">
                    <FaChevronLeft className="text-white cursor-pointer"/>
                    <div className="flex">
                        <div className="rounded-full bg-white/60 text-indigo-300 mr-3 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Jul
                        </div>

                        <div className="rounded-full bg-white/60 text-indigo-300 mr-3 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Aug
                        </div>

                        <div className="rounded-full bg-white text-indigo-300 mr-3 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Sep
                        </div>
                        
                        <div className="rounded-full bg-white/60 text-indigo-300 mr-3 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Oct
                        </div>
                        
                        <div className="rounded-full bg-white/60 text-indigo-300 mr-3 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Nov
                        </div>
                        
                        <div className="rounded-full bg-white/60 text-indigo-300 px-4 py-1 flex items-center justify-center text-center font-medium select-none cursor-pointer">
                            Dec
                        </div>
                    </div>
                    <FaChevronRight className="text-white cursor-pointer"/>
                </div>
            </section>
        </>
    )
}