import { app } from "../../global/firebase"
import firebase from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import  { useState } from "react"

const auth = getAuth()

function validateEmail(value) {
    let error
    if (!value) {
        error = "Your email is required."
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = "Invalid email address."
    }
    return error
}
  
function validatePw(value) {
    let error
    if (value.length < 8) {
        error = "Password should be at least 8 characters long."
    }
    return error
}

export default function SignUp() {
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }  

    const onChangePass = (event) => {
        setPass(event.target.value)
    }  

    const signUpHandler = async () => {
        createUserWithEmailAndPassword(auth, email, pass)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorCode)
                console.log(errorMessage)
                setError(errorMessage)
                // ..
            })
    }

    return(
        <>
            <div
            onClick={() => anon()}
            className="w-full text-center rounded-lg bg-blue-500/[0.85] hover:bg-blue-500  text-white p-2 mt-5 mb-2 ease-in-out duration-100 cursor-pointer"
            >Temporary Sign In</div>

            <div className="w-full flex justify-center items-center mb-5 mt-8">
                <div className="w-full h-[0.125rem] bg-slate-600"/>
                <p className="px-5 pb-1 text-slate-600 font-semibold">or</p>
                <div className="w-full h-[0.125rem] bg-slate-600"/>
            </div>

            <h1 className="mt-4 text-2xl text-slate-600">Sign Up</h1>
            <div>
                <input
                id="email"
                placeholder="user@example.com"
                value={email}
                onChange={onChangeEmail}
                className="w-full rounded-lg p-2 mt-5 mb-2 focus:outline-none focus:border-blue-400 border-blue-200 border-2"
                />
                <input
                id="password"
                placeholder="password"
                value={pass}
                onChange={onChangePass}
                className="w-full rounded-lg p-2 mt-2 mb-5 focus:outline-none focus:border-blue-400 border-blue-200 border-2"
                />
                <button
                className="w-full text-center rounded-lg bg-blue-500/[0.85] hover:bg-blue-500  text-white p-2 mt-5 mb-2 ease-in-out duration-100"
                onClick={() => signUpHandler()}
                >Send</button>
            </div>
            <p>{error}</p>
        </>
    )
}