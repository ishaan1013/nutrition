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
                <>
                    <section className="z-40 absolute h-screen w-screen flex items-center justify-center">
                        <Search />
                    </section>
                    
                    <div className="z-30 backdrop-blur-md h-screen w-screen absolute"/>
                </>
            }
            <Dashboard />
        </div>
    )
}