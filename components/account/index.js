import { useState } from "react"

import LogIn from "./logIn"
import SignUp from "./signUp"

export default function Account() {
    const [isLogIn, setIsLogIn] = useState(true)

    return (
        <>
            <section className="h-full w-full flex items-center justify-center">
                <div className="w-[30rem] bg-white/30 rounded-3xl shadow-xl shadow-gray-200/50 px-10 py-7 ml-5 relative overflow-hidden backdrop-blur-lg flex items-center justify-center flex-col">
                    {isLogIn ? <LogIn /> : <SignUp />}
                    {isLogIn ?
                    <div
                    onClick={() => setIsLogIn(false)}
                    style={{cursor: "pointer"}}
                    className="text-slate-600 my-2"
                    >Need an account? <span className="font-semibold">Sign up</span></div>
                    :
                    <div
                    onClick={() => setIsLogIn(true)}
                    style={{cursor: "pointer"}}
                    className="text-slate-600 my-2"
                    >Already have an account? <span className="font-semibold">Log in</span></div>
                    }
                </div>
            </section>
        </>
    )
}