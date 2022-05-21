import { useState } from "react"
import { useAppContext } from "../../../global/state"

export default function FoodList(props) {
    
    return (
        <>
            <section className="w-96 bg-white rounded-3xl shadow-xl shadow-gray-200/50 px-10 py-7 ml-5 relative overflow-hidden">
                <div className="flex justify-between items-center">
                    <h1 className="text-slate-600 text-2xl mb-2 font-black">{props.mealName}</h1>
                    <div className="flex flex-col items-end">
                        <h1 className="text-slate-600 text-2xl mb-[-0.4rem] font-black">500</h1>
                        <p className="text-slate-500/90 font-medium">cals</p>
                    </div>
                </div>

                <div className="w-full h-[0.15rem] bg-slate-200 mt-3 mb-6"/>
            </section>
        </>
    )
}