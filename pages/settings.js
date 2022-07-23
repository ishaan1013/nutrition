import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useAppContext } from "../global/state"

import { MdWarning } from "react-icons/md"
import SwitchOption from "../components/settings/switchOption"
import Sidebar from "../components/sidebar"
import { set } from "firebase/database"

export default function Settings() {

    const [isKg, setIsKg] = useState(true)
    const [isAnon, setIsAnon] = useState(false)
    const router = useRouter()
    const auth = getAuth()
    const user = auth.currentUser

    // function SwitchOption(props) {
    //     if ((props.isKg && props.kg) || (!props.isKg && !props.kg)) {   
    //         return (
    //             <div 
    //             className="cursor-pointer rounded-full py-2 px-4 bg-blue-500/90 font-semibold text-sm text-white"
    //             >
    //                 {props.optionText}
    //             </div>
    //         )
    //     }
    //     else {
    //         return (
    //             <div 
    //             className="cursor-pointer rounded-full py-2 px-4 bg-transparent font-medium text-sm text-slate-600"
    //             onClick={() => {props.setIsKg(!props.isKg)}}
    //             >
    //                 {props.optionText}
    //             </div>
    //         )
    //     }
    // }

    useEffect(() => {
        if (!user) {
            router.push("/")
        } else {
            setIsAnon(user.isAnonymous)
        }
    }, [])


    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full px-20 py-10 select-none">
                <h1 className="text-3xl text-blue-500/[0.85] mb-12">Settings</h1>
                { isAnon &&
                <div className="flex pt-2 pb-8">
                    <div className="p-4 2xl:w-1/4 xl:w-1/3 lg:w-2/5 md:w-3/5 rounded-xl border-[1px] border-red-500 bg-red-50">
                        <MdWarning className="text-red-500 mb-2 w-6 h-6" />
                        <p className="leading-[1.75rem] font-medium text-red-500">
                            You&apos;re using a temporary account. Your account data will not be saved.
                        </p>
                    </div>
                </div>
                }
                <div className="w-full flex justify-between items-center border-b-[1px] border-slate-300 py-3">
                    <h4 className="font-semibold text-slate-600">Weight Measurement Units</h4>
                    <div className="p-[0.1rem] rounded-full border-[1.7px] border-blue-500/90 bg-blue-100 flex">
                        <SwitchOption isKg={isKg} setIsKg={setIsKg} optionText="Kilograms (Kg)" kg/>
                        <SwitchOption isKg={isKg} setIsKg={setIsKg} optionText="Pounds (Lbs)" kg={false}/>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center border-b-[1px] border-slate-300 py-4">
                    <h4 className="font-extrabold text-slate-600 mb-4">Nutrition Goals</h4>
                    <div className="flex w-full justify-between items-center my-1">
                        <h4 className="font-semibold text-slate-600">Daily Calories</h4>
                        <input
                        id="caloriesInput"
                        type="number"
                        placeholder="Calories (g)" 
                        className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm" 
                        />
                    </div>
                    <div className="flex w-full justify-between items-center my-1">
                        <h4 className="font-semibold text-slate-600">Protein</h4>
                        <input
                        id="proteinInput"
                        type="number"
                        placeholder="Protein (g)" 
                        className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm" 
                        />
                    </div>
                    <div className="flex w-full justify-between items-center my-1">
                        <h4 className="font-semibold text-slate-600">Carbohydrates</h4>
                        <input
                        id="carbsInput"
                        type="number"
                        placeholder="Carbohydrates (g)" 
                        className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm" 
                        />
                    </div>
                    <div className="flex w-full justify-between items-center my-1">
                        <h4 className="font-semibold text-slate-600">Fats</h4>
                        <input
                        id="fatsInput"
                        type="number"
                        placeholder="Fats (g)" 
                        className="w-44 p-2 rounded-lg focus:outline-none focus:border-slate-400 border-slate-300 border-[1px] placeholder:text-slate-300 placeholder:font-normal text-slate-600 font-medium text-sm" 
                        />
                    </div>
                </div>
            </main>
        </div>
    )
}