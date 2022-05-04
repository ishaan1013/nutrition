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

    const signUpHandler = async () => {
        createUserWithEmailAndPassword(auth, values.email, values.pw)
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
            <div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                    name="email"
                    placeholder="user@example.com"
                    as="input"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                    id="password"
                    name="pw"
                    placeholder=""
                    as="input"
                    />
                </div>
                <button
                onClick={() => signUpHandler()}
                >Send</button>
            </div>
            <p>{error}</p>
        </>
    )
}