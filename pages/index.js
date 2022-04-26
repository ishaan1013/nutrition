import Head from "next/head"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nutrition App</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen p-10">
        <h1>
          Welcome to Next.js!
        </h1>
      </main>
    </div>
  )
}
