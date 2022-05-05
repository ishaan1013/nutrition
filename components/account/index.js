import { useState } from "react"

import LogIn from "./logIn"
import SignUp from "./signUp"

export default function Account() {
    const [isLogIn, setIsLogIn] = useState(true)

    return (
        <>
            {isLogIn ? <LogIn /> : <SignUp />}

            <div
            onClick={() => setIsLogIn(false)}
            style={{cursor: "pointer"}}
            >Sign Up</div>
            <div
            onClick={() => setIsLogIn(true)}
            style={{cursor: "pointer"}}
            >Log In</div>
        </>
    )
}