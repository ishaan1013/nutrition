import { app } from "../../global/firebase"
import firebase from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signInAnonymously  } from "firebase/auth"
import  { useState } from "react"

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

    const logInHandler = async () => {
        signInWithEmailAndPassword(auth, email, pass)
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
            })
    }

    function anon() {
        signInAnonymously(auth)
            .then(() => {
                console.log("signed in anonymously")
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ...
            })
    }

    return(
        <>
            <div
            onClick={() => anon()}
            >sign in anonymously</div>
            <div>
                <div>
                    <input
                    id="email"
                    placeholder="user@example.com"
                    value={email}
                    onChange={onChangeEmail}
                    />
                </div>
                <div>
                    <input
                    id="password"
                    placeholder="password"
                    value={pass}
                    onChange={onChangePass}
                    />
                </div>
                <button
                onClick={() => logInHandler()}
                >Send</button>
            </div>
            <p>{error}</p>
        </>
    )
}