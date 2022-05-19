import {useState} from "react"

import Dashboard from "../dashboard"
import Sidebar from "../sidebar"
import Search from "../search"

export default function Page() {
    const [isSearching, setIsSearching] = useState(false)

    return (
        <div className="flex">
            <Sidebar isSearching={isSearching} setIsSearching={setIsSearching}/>
            { isSearching &&
                <section className="absolute h-screen w-screen flex items-center justify-center">
                    <Search />
                </section>
            }
            <Dashboard />
        </div>
    )
}