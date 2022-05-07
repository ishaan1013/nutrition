import Image from "next/image"
import Logo from "../../../assets/logo.png"
import { getAuth, signOut } from "firebase/auth"
import { MdOutlineDashboard, MdSearch, MdOutlineSettings, MdOutlineLogout } from "react-icons/md"

export default function Sidebar() {

    const auth = getAuth()

    function signOutHandler() {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <nav className="h-screen w-24 flex flex-col justify-between items-center py-10 px-5 bg-gradient-to-tl from-blue-400 to-indigo-300">
                <ul>
                    <div className="relative flex items-center">
                    <li id="customHover1" className="cursor-pointer">
                        <Image src={Logo} width={36} height={36}/>
                    </li>
                        <p className="left-[3.2rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 mb-2 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling1">
                            About
                        </p>
                    </div>
                </ul>
                <ul>
                    <div className="relative flex items-center">
                        <li id="customHover2">
                            <MdOutlineDashboard className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling2">
                            Dashboard
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover3">
                            <MdSearch className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling3">
                            Search
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover4">
                            <MdOutlineSettings className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling4">
                            Settings
                        </p>
                    </div>
                </ul>
                <ul>
                    <div className="relative flex items-center">
                        <li 
                        onClick={() => signOutHandler()}
                        id="customHover5"
                        >
                            <MdOutlineLogout className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling5">
                            Logout
                        </p>
                    </div>
                </ul>
            </nav>
        </>
        
    )
}