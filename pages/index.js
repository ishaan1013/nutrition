import Head from "next/head"
import Image from "next/image"
import { useAppContext } from "../global/state"

import Calendar from "../components/calendar"

export default function Home() {
  const appContext = useAppContext()

  return (
    <div>
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen p-10">
        {/* <h1>
          Welcome to Next.js!
        </h1>
        <p>
          {appContext.day}
        </p> */}


        <Calendar />
      </main>
    </div>
  )
}
