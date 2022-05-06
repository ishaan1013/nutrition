import Head from "next/head"
import { useState } from "react"
import { useAppContext } from "../global/state"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"

import Account from "../components/account"
import Weight from "../components/weight"
import Calendar from "../components/calendar"

export default function Home() {
  const appContext = useAppContext()
  const [userIn, setUserIn] = useState(false)

  const auth = getAuth()

  function signOutFunc() {
    signOut(auth).then(() => {
      console.log("signed out")
    }).catch((error) => {
      console.log(error)
    })
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      setUserIn(true)
      console.log(user)
    } else {
      setUserIn(false)
    }
  })

  function Dashboard() {
    return (
      <>
        <div className="flex">
          <Calendar />
          <Weight />
        </div>
        <div
        onClick={() => signOutFunc()}
        >
          sign out
        </div>
      </>
    )
  }

  return (
    <div>
      <Head>
        <title>Food</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen p-10">
        {userIn ? <Dashboard /> : <Account />}
      </main>
    </div>
  )
}
