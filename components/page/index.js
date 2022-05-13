import Dashboard from "../dashboard"
import Sidebar from "./sidebar"

export default function Dashboard() {

    return (
        <div className="flex">
            <Sidebar/>
            <main className="w-full h-screen p-10">
                <div className="flex justify-between 2xl:px-[3vw] px-[1vw] min-w-[1350px]">
                    <Calendar />
                    <Weight />
                    <Consumed />
                </div>
            </main>
        </div>
    )
}