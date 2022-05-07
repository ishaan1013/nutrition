import Weight from "./weight"
import Consumed from "./consumed"
import Calendar from "./calendar"
import { getAuth, signOut } from "firebase/auth"

export default function Dashboard() {
    const auth = getAuth()

    function signOutFunc() {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
         <>
            <div className="flex">
                <Calendar />
                <Weight />
                <Consumed />
            </div>
            <div
            onClick={() => signOutFunc()}
            >
                sign out
            </div>
        </>
    )
}