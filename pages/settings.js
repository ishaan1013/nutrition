import { set } from "firebase/database"
import { useState } from "react"
import { useAppContext } from "../global/state"

import { MdWarning } from "react-icons/md"
import SwitchOption from "../components/settings/switchOption"
import Sidebar from "../components/sidebar"

export default function Settings() {

    const [isKg, setIsKg] = useState(true)
    const appContext = useAppContext()

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

    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full px-20 py-10 select-none">
                <h1 className="text-3xl text-blue-500/[0.85] mb-12">Settings</h1>
                { appContext.sharedState.globalAnon &&
                <div className="flex pt-2 pb-8">
                    <div className="p-4 2xl:w-1/4 xl:w-1/3 lg:w-2/5 md:w-3/5 rounded-xl border-2 border-red-500">
                        <MdWarning className="text-red-500 mb-2 w-6 h-6" />
                        <h4 className="leading-[1.75rem] font-semibold text-red-500">
                            <span className="font-extrabold">Warning:</span> You&apos;re using a temporary account. Your account data will not be saved. If you want to save your data, log out and create an account.
                        </h4>
                    </div>
                </div>
                }
                <div className="w-full flex justify-between items-center border-y-2 border-slate-200 py-2">
                    <h4 className="font-semibold text-slate-600">Weight Measurement Units</h4>
                    <div className="p-[0.1rem] rounded-full border-[1.7px] border-blue-500/90 bg-blue-100 flex">
                        <SwitchOption isKg={isKg} setIsKg={setIsKg} optionText="Kilograms (Kg)" kg/>
                        <SwitchOption isKg={isKg} setIsKg={setIsKg} optionText="Pounds (Lbs)" kg={false}/>
                    </div>
                </div>
            </main>
        </div>
    )
}