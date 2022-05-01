import Head from "next/head"
import Image from "next/image"
import { useAppContext } from "../global/state"
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Calendar from "../components/calendar"

export default function Home() {
  const appContext = useAppContext()

  const auth = getAuth();

  function Page() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        return (
          <Dashboard />
        )
      } else {
        return(
          null
        )
      }
    });
  }

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
        <title>Nutrition App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen p-10">
        <Page />
      </main>
    </div>
  )
}
