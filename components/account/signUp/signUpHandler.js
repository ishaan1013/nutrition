import { app } from "../../../global/firebase"
import firebase from "firebase/app"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import createUserDb from "./createUserDb"

const auth = getAuth()

const signUpHandler = async (email, pass, setError) => {
    createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log("signed up")
            createUserDb(user.uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            setError(errorMessage)
        })
}

export default signUpHandler