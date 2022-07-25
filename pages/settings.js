import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
// import { useAppContext } from "../global/state"

import { MdWarning } from "react-icons/md"
import SwitchOption from "../components/settings/switchOption"
import Sidebar from "../components/sidebar"
// import { set } from "firebase/database"
import NutritionOptions from "../components/settings/nutritionOptions"

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
            <main className="w-full px-20 py-10 md:ml-20 select-none">
                <h1 className="text-3xl text-blue-500/[0.85] mb-12">Settings</h1>
                { isAnon &&
                <div className="flex pt-2 pb-8">
                    <div className="p-4 2xl:w-1/4 xl:w-1/3 lg:w-2/5 md:w-3/5 rounded-xl border-[1px] border-red-500 bg-red-50">
                        <MdWarning className="text-red-500 mb-2 w-6 h-6" />
                        <p className="leading-[1.75rem] font-medium text-red-500">
                            You&apos;re using a temporary account. Your data will not be saved once logged out.
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
                <NutritionOptions />
            </main>
        </div>
    )
}