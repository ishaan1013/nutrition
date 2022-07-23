import { app } from "../../global/db/firebase"
import firebase from "firebase/app"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/router"
import { useAppContext } from "../../global/state"

import Logo from "../../assets/logo.png"
import { getAuth, signOut } from "firebase/auth"
import { MdOutlineDashboard, MdSearch, MdOutlineSettings, MdOutlineLogout } from "react-icons/md"

export default function Sidebar(props) {

    const auth = getAuth()
    const appContext = useAppContext()
    const [isOpened , setIsOpened] = useState(false)

    function signOutHandler() {
        signOut(auth).then(() => {
            console.log("signed out")
        }).catch((error) => {
            console.log(error)
        })
    }

    const router = useRouter()
    
    function SearchButton() {
        if (router.pathname != "/") { 
            return (
                <Link
                href="/"
                passHref
                >
                    <MdSearch className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                </Link>
            )   
        } else {
            return (
                <div
                onClick={() => {props.setIsSearching(!props.isSearching)}}
                >
                    <MdSearch className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                </div>
            )
        }
    }

    function DashButton() {
        if (router.pathname != "/") { 
            return (
                <Link 
                href="/" 
                passHref
                >
                    <MdOutlineDashboard 
                    className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"
                    />
                </Link>
            )   
        } else {
            return (
                <Link 
                href="/" 
                passHref
                >
                    <MdOutlineDashboard 
                    onClick={() => {props.setIsSearching(false)}}
                    className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"
                    />
                </Link>
            )
        }
    }

    function SidebarContent() {
        return (
            <>
                <ul>
                    <div className="relative flex items-center pointer-events-none">
                        <li>
                            <div 
                            className="w-8 h-8 xl:w-9 xl:h-9"
                            >
                                <Image alt="Logo" src={Logo}/>
                            </div>
                        </li>
                    </div>
                </ul>
                <ul>
                    <div className="relative flex items-center">
                        <li id="customHover2">
                            <DashButton />
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling2">
                            Dashboard
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover3">
                            <SearchButton />
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling3">
                            Search
                        </p>
                    </div>
                    <div className="relative flex items-center">
                        <li id="customHover4">
                            <Link href="/settings" passHref>
                                <MdOutlineSettings className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
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
                        onClick={() => {
                            signOutHandler()
                            appContext.setGlobalUid("")
                            router.push("/")
                        }}
                        id="customHover5"
                        >
                            <MdOutlineLogout className="w-11 h-11 xl:w-12 xl:h-12 text-white p-[0.65rem] m-2 hover:bg-white/[0.15] rounded-full cursor-pointer"/>
                        </li>
                        <p className="left-[3.75rem] absolute bg-black/[0.02] text-black/80 rounded-lg px-3 py-1 text-sm font-semibold border-2 border-black/[0.15] backdrop-blur-md" id="customHoverSibling5">
                            Logout
                        </p>
                    </div>
                </ul>
            </>
        )
    }

    return (
        <>
            {!isOpened && 
            <div className="z-[48] md:hidden fixed">
                <div 
                onClick={() => setIsOpened(true)}
                className="select-none cursor-pointer p-2 bg-sky-500 flex absolute top-4 left-4 w-12 h-12 xl:w-9 xl:h-9 rounded-2xl shadow-lg shadow-sky-400"
                >
                    <Image alt="Logo" src={Logo}/>
                </div>
            </div>
            }
            
            {isOpened && 
            <>
                <nav className="flex z-[49] select-none h-screen w-30 md:hidden flex-col justify-between items-center py-10 px-5 bg-blue-500/90">
                    <SidebarContent />
                </nav>
                <div 
                onClick={() => {setIsOpened(false)}} 
                className="md:hidden absolute w-full h-screen z-[48]" 
                />
            </>
            }

            <nav className="hidden z-50 select-none h-screen w-[4.8rem] xl:w-24 md:flex flex-col justify-between items-center py-10 px-5 bg-blue-500/90">
                <SidebarContent />
            </nav>
        </>
        
    )
}