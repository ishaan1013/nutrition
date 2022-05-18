import Weight from "./top/weight"
import Consumed from "./top/consumed"
import Calendar from "../calendar"
import Sidebar from "../page/sidebar"

export default function Dashboard() {

    return (
        <div className="flex">
            <Sidebar/>
            <main className="min-w-[1370px] 2xl:min-w-[1450px] h-screen p-10">
                <div className="flex justify-between xl:ml-6 ml-3">
                    <Calendar />
                    <Weight />
                    <Consumed />
                </div>
            </main>
        </div>
    )
}