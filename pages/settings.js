import { set } from "firebase/database"
import { useState } from "react"

import Sidebar from "../components/sidebar"

export default function Settings() {

    const [isKg, setIsKg] = useState(true)

    function SwitchOption(props) {
        if ((isKg && props.kg) || (!isKg && !props.kg)) {   
            return (
                <div 
                className="cursor-pointer rounded-full py-2 px-4 bg-blue-500/90 font-semibold text-sm text-white"
                >
                    {props.optionText}
                </div>
            )
        }
        else {
            return (
                <div 
                className="cursor-pointer rounded-full py-2 px-4 bg-transparent font-medium text-sm text-slate-600"
                onClick={() => {setIsKg(!isKg)}}
                >
                    {props.optionText}
                </div>
            )
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <main className="w-full px-20 py-10">
                <h1 className="text-2xl">Settings</h1>
                <div className="w-full flex justify-between items-center border-y-2 border-slate-200 py-2 mt-8">
                    <h4 className="font-semibold text-slate-600">Weight Measurement Units</h4>
                    <div className="p-[0.1rem] rounded-full border-[1.7px] border-blue-500/90 bg-blue-100 flex select-none">
                        <SwitchOption optionText="Kilograms (Kg)" kg/>
                        <SwitchOption optionText="Pounds (Lbs)" kg={false}/>
                    </div>
                </div>
            </main>
        </div>
    )
}