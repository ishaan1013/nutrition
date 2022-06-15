import { useState } from "react"
import { useAppContext } from "../../../global/state"
import { FaChevronRight } from "react-icons/fa"

export default function Consumed() {

    return (
        <>
            <section className="h-[19rem] w-80 bg-white rounded-3xl shadow-xl shadow-gray-200/10 px-10 py-7 mr-8 xl:mr-16 relative overflow-hidden">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-slate-600 text-5xl mb-2 font-black">50%</h1>
                        <p className="text-slate-500/90 font-medium">consumed</p>
                    </div>
                    <FaChevronRight
                    className="text-slate-600 cursor-pointer hover:bg-slate-100/60 p-[0.3rem] h-[1.8rem] w-[1.8rem] rounded-full"
                    />
                </div>

                <div className="relative my-1 w-[68px] h-[68px] top-16 flex items-center justify-center">
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] -translate-y-12 text-slate-600 font-semibold">Protein</p>
                    <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">50%</p>
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] translate-y-12 text-slate-600 font-semibold">
                        50g
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="50"
                        />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-slate-300 stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="0"
                        />
                    </svg>
                </div>

                <div className="relative my-1 w-[68px] h-[68px] left-20 -top-10 flex items-center justify-center">
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] -translate-y-12 text-slate-600 font-semibold">Carbs</p>
                    <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">50%</p>
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] translate-y-12 text-slate-600 font-semibold">
                        50g
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="50"
                        />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-slate-300 stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="0"
                        />
                    </svg>
                </div>
                
                <div className="relative my-1 w-[68px] h-[68px] left-40 -top-20 flex items-center justify-center">
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] -translate-y-12 text-slate-600 font-semibold">Fats</p>
                    <p className="translate-x-[0.1rem] text-[0.8rem] text-slate-600 font-semibold text-center">50%</p>
                    <p className="text-[0.8rem] absolute translate-x-[0.1rem] translate-y-12 text-slate-600 font-semibold">
                        50g
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="z-10 absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-blue-500/[0.85] stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="50"
                        />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute rotate-[270deg] w-[68px] h-[68px]">
                        <circle
                        cx="34"
                        cy="34"
                        r="28"
                        strokeLinecap="round"
                        className="stroke-slate-300 stroke-[12] fill-transparent"
                        strokeDasharray="175"
                        strokeDashoffset="0"
                        />
                    </svg>
                </div>
            </section>
        </>
    )
}