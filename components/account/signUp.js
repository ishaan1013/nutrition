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
            <div>
                <div>
                    <input
                    id="email"
                    placeholder="user@example.com"
                    as="input"
                    value={email}
                    onChange={onChangeEmail}
                    />
                </div>
                <div>
                    <input
                    id="password"
                    placeholder="pw"
                    as="input"
                    value={pass}
                    onChange={onChangePass}
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