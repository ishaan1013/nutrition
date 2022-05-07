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
        <nav className="h-screen w-24 flex flex-col justify-between items-center py-10 px-5 bg-gradient-to-tl from-blue-400 to-indigo-300">
            <ul>
                <li><Image src={Logo} width={36} height={36}/></li>
            </ul>
            <ul>
                <li><MdOutlineDashboard className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/></li>
                <li><MdSearch className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/></li>
                <li><MdOutlineSettings className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/></li>
            </ul>
            <ul>
                <li
                onClick={() => signOutHandler()}
                ><MdOutlineLogout className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/></li>
            </ul>
        </nav>
    )
}