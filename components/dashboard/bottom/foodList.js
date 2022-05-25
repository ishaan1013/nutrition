import { useState } from "react"
import { useAppContext } from "../../../global/state"

import FoodItem from "./foodItem"

export default function FoodList(props) {
    const [totalCal, setTotalCal] = useState(0)
    const appContext = useAppContext()
    const date = "" + appContext.sharedState.year + appContext.sharedState.month + appContext.sharedState.day
    
    return (
        <>
            <section className="w-96 bg-white rounded-3xl shadow-xl shadow-gray-200/50 px-10 py-7 relative overflow-hidden">
                <div className="flex justify-between items-center">
                    <h1 className="text-slate-600 text-2xl mb-2 font-black">{props.mealName}</h1>
                    <div className="flex flex-col items-end">
                        <h1 className="text-slate-600 text-2xl mb-[-0.4rem] font-black">{totalCal}</h1>
                        <p className="text-slate-500/90 font-medium">cals</p>
                    </div>
                </div>

                <FoodItem 
                userId={appContext.sharedState.globalUid} 
                date={date} 
                meal="breakfast" 
                totalCal={totalCal}
                setTotalCal={setTotalCal}
                />
        
            </section>
        </>
    )
}