import Head from "next/head"
import Image from "next/image"
import { useState } from 'react'
import { useAppContext } from "../global/state"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Account from "../components/account"
import Calendar from "../components/calendar"

export default function Home() {
  const appContext = useAppContext()
  const [userIn, setUserIn] = useState(false)

  const auth = getAuth()
  const user = auth.currentUser

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUserIn(true)
    } else {
      setUserIn(false)
    }
  })

  function Dashboard() {
    return (
      <>
        {/* <h1>
          Welcome to Next.js!
        </h1>
        <p>
          {appContext.day}
        </p> */}

        <Calendar />
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
