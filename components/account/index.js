import Image from 'next/image'
import { useState } from "react"

import LogIn from "./logIn"
import SignUp from "./signUp"
import Logo from "../../assets/logo.png"

export default function Account() {
    const [isLogIn, setIsLogIn] = useState(true)

    return (
        <>
            <section className="h-full w-full flex items-center justify-center">
                <div className="w-[30rem] bg-white/30 rounded-3xl shadow-xl shadow-gray-200/50 p-10 ml-5 relative overflow-hidden backdrop-blur-lg flex items-center justify-center flex-col">
                    <Image 
                    src={Logo}
                    width={50}
                    height={50}
                    />
                    <h1 className="mt-3 mb-10 text-[1.7rem] text-blue-500/90 font-black">Nutrition + Weight Tracker</h1>

                    {isLogIn ? <LogIn /> : <SignUp />}
                    {isLogIn ?
                    <div
                    onClick={() => setIsLogIn(false)}
                    style={{cursor: "pointer"}}
                    className="text-slate-600 my-2 text-sm"
                    >Need an account? <span className="font-semibold">Sign up</span></div>
                    :
                    <div
                    onClick={() => setIsLogIn(true)}
                    style={{cursor: "pointer"}}
                    className="text-slate-600 my-2 text-sm"
                    >Already have an account? <span className="font-semibold">Log in</span></div>
                    }
                </div>
            </section>
        </>
    )
}