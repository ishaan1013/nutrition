import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"

export default function Dashboard() {

    return (
        <main className="min-w-[1370px] 2xl:min-w-[1450px] h-screen p-10">
            <div className="flex justify-between xl:ml-6 ml-3">
                <Calendar />
                <Weight />
                <Consumed />
            </div>
        </main>
    )
}