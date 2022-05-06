import Weight from "./weight"
import Consumed from "./consumed"
import Calendar from "./calendar"

export default function Dashboard() {
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