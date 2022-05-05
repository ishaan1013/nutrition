import { useState } from "react"

import LogIn from "./logIn"
import SignUp from "./signUp"

export default function Account() {
    const [isLogIn, setIsLogIn] = useState(true)

    return (
        <>
            <section className="h-full w-full flex items-center justify-center">
                <div className="h-[92%] w-[30rem] bg-white/30 rounded-3xl shadow-xl shadow-gray-200/50 px-10 py-7 ml-5 relative overflow-hidden backdrop-blur-lg">
                    {isLogIn ? <LogIn /> : <SignUp />}
                    {isLogIn ?
                    <div
                    onClick={() => setIsLogIn(false)}
                    style={{cursor: "pointer"}}
                    >Need an account? Sign up</div>
                    :
                    <div
                    onClick={() => setIsLogIn(true)}
                    style={{cursor: "pointer"}}
                    >Already have an account? Log in</div>
                    }
                </div>
            </section>
        </>
    )
}