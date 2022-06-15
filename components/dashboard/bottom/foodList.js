import { useState, useReducer, useEffect } from "react"
import { app } from "../../../global/db/firebase"
import { useAppContext } from "../../../global/state"

import FoodItem from "./foodItem"

export default function FoodList(props) {
    const [totalCal, setTotalCal] = useState(0)
    const [totalProtein, setTotalProtein] = useState(0)
    const [totalCarbs, setTotalCarbs] = useState(0)
    const [totalFats, setTotalFats] = useState(0)
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    const appContext = useAppContext()
    const date = "" + appContext.sharedState.year + appContext.sharedState.month + appContext.sharedState.day

    useEffect(() => {
        if (props.updateFoods) {
            forceUpdate()
            props.setUpdateFoods(false)
            setTotalCal(0)
            setTotalProtein(0)
            setTotalCarbs(0)
            setTotalFats(0)
        }
    }, [props.updateFoods])

    useEffect(() => {
        props.setCalSum(totalCal)
        props.setPSum(totalProtein)
        props.setCSum(totalCarbs)
        props.setFSum(totalFats)
    }, [totalCal])
    
    return (
        <>
            <section className="w-80 bg-white rounded-3xl shadow-xl shadow-gray-200/10 px-10 py-7 relative overflow-hidden mr-8 self-start">
                <div className="flex justify-between items-center">
                    <h1 className="text-slate-600 text-2xl mb-2 font-black">{props.mealName}</h1>
                    <div className="flex flex-col items-end"
                    onClick={() => {appContext.changeDayContext(appContext.sharedState.day - 1)}}
                    >
                        <h1 className="text-slate-600 text-2xl mb-[-0.4rem] font-black">{totalCal}</h1>
                        {/* <p className="text-slate-500/90 font-medium">{date}</p> */}
                        <p className="text-slate-500/90 font-medium">cals</p>
                    </div>
                </div>

                <FoodItem 
                userId={appContext.sharedState.globalUid} 
                date={date} 
                meal={props.mealName}
                totalCal={totalCal}
                setTotalCal={setTotalCal}
                setTotalProtein={setTotalProtein}
                setTotalCarbs={setTotalCarbs}
                setTotalFats={setTotalFats}
                />
        
            </section>
        </>
    )
}