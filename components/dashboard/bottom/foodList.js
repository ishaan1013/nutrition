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

                <div className="flex justify-between items-center bg-transparent border-2 border-slate-300 hover:border-blue-300 hover:bg-blue-50 duration-300 ease-in-out cursor-pointer rounded-lg p-4 my-4 select-none">
                    <div className="flex flex-col">
                        <h1 className="text-slate-600">Food Name</h1>
                        <h4 className="text-slate-600 text-sm">1 unit</h4>
                    </div>
                    <div className="flex flex-col items-end">
                        <h1 className="mb-[-0.3rem] text-slate-600">
                            660
                        </h1>
                        <h4 className="text-slate-600 text-sm">cals</h4>
                    </div>
                </div>

            </section>
        </>
    )
}