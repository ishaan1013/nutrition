import Image from "next/image"
import Link from "next/link"
import Logo from "../../assets/logo.png"
import { getAuth, signOut } from "firebase/auth"
import { MdOutlineDashboard, MdSearch, MdOutlineSettings, MdOutlineLogout } from "react-icons/md"

export default function Sidebar(props) {

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
            <nav className="z-50 h-screen w-24 flex flex-col justify-between items-center py-10 px-5 bg-gradient-to-tl from-blue-400 to-indigo-300">
                <ul>
                    <div className="relative flex items-center">
                        <li id="customHover1" className="cursor-pointer">
                            <Link href="/about" passHref>
                                <Image src={Logo} width={36} height={36}/>
                            </Link>
                        </li>
                        <p className="left-[3.2rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 mb-2 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling1">
                            About
                        </p>
                    </div>
                </ul>
                <ul>
                    <div className="relative flex items-center">
                        <li id="customHover2">
                            <Link href="/" passHref>
                                <MdOutlineDashboard className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                            </Link>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling2">
                            Dashboard
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover3">
                            <div
                            onClick={() => {props.setIsSearching(!props.isSearching)}}
                            >
                                <MdSearch className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                            </div>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling3">
                            Search
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover4">
                            <Link href="/settings" passHref>
                                <MdOutlineSettings className="w-12 h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                            </Link>
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