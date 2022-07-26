import { app } from "../../../global/db/firebase"
import firebase from "firebase/app"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const auth = getAuth()

const logInHandler = async (email, pass, setError) => {
    signInWithEmailAndPassword(auth, email, pass)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user
            // console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            setError(errorMessage)
        })
}

export default logInHandler