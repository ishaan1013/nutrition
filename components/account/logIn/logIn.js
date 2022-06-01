import { app } from "../../../global/db/firebase"
import firebase from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import  { useState } from "react"

import Guest from "../guest"
import logInHandler from "./logInHandler"

const auth = getAuth()

function validateEmail(value) {
    let error
    if (!value) {
        error = "Your email is required."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Invalid email address."
    }
    // use state for this and check if account does not exist with firebase error code
    return error
}
  
function validatePw(value) {
    let error
    if (value.length < 8) {
        error = "Password should be at least 8 characters long."
        // use state for error message and use the error code from firebase to check
    }
    return error
}

export default function Login() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }  

    const onChangePass = (event) => {
        setPass(event.target.value)
    }  

    // const logInHandler = async () => {
    //     signInWithEmailAndPassword(auth, email, pass)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user
    //             console.log(user)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code
    //             const errorMessage = error.message
    //             console.log(errorCode)
    //             console.log(errorMessage)
    //             setError(errorMessage)
    //         })
    // }

    return(
        <>
            <Guest />
            {/* <div
            onClick={() => anon()}
            className="w-full text-center rounded-lg bg-blue-500/[0.85] hover:bg-blue-500  text-white p-2 mt-5 mb-2 ease-in-out duration-100 cursor-pointer font-medium"
            >
                Guest Log In
            </div>
            <p className="text-slate-600 text-xs font-medium flex items-center">
                Anonymously log in. Your data will not be saved.
            </p> */}

            <div className="w-full flex justify-center items-center mb-3 mt-7">
                <div className="w-full h-[0.115rem] bg-slate-600"/>
                <p className="px-4 pb-1 text-slate-600 font-semibold text-sm">or</p>
                <div className="w-full h-[0.115rem] bg-slate-600"/>
            </div>

            <h1 className="mt-4 text-xl text-slate-600">Log In</h1>
            <div className="w-full">
                <div className="relative mt-5 mb-2">
                    <label className="absolute top-1 left-[10px] text-[0.65rem] font-extrabold text-slate-600">
                        Email:
                    </label>
                    <input
                    id="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={onChangeEmail}
                    className="w-full rounded-lg px-2 pb-[0.45rem] pt-[1.2rem] focus:outline-none focus:border-slate-400 border-slate-300 border-2 placeholder:text-slate-300 text-slate-600"
                    />
                </div>
                <div className="relative mt-5 mb-2">
                    <label className="absolute top-1 left-[10px] text-[0.65rem] font-extrabold text-slate-600">
                        Password:
                    </label>
                    <input
                    id="password"
                    placeholder="********"
                    value={pass}
                    onChange={onChangePass}
                    className="w-full rounded-lg px-2 pb-[0.45rem] pt-[1.2rem] focus:outline-none focus:border-slate-400 border-slate-300 border-2 placeholder:text-slate-300 text-slate-600"
                    />
                </div>
                <button
                className="w-full text-center rounded-lg bg-blue-500/[0.85] hover:bg-blue-500  text-white p-2 mt-5 mb-2 ease-in-out duration-100 font-medium"
                onClick={() => logInHandler(email, pass, setError)}
                >Log In</button>
            </div>
            <p>{error}</p>
        </>
    )
}