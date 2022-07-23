import { getAuth, signInAnonymously  } from "firebase/auth"

export default function Guest() {
    const auth = getAuth()
    function anon() {
        signInAnonymously(auth)
            .then(() => {
                console.log("signed in anonymously")
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                // ...
            })
    }

    return (
        <>
            <div
            onClick={() => anon()}
            className="w-full text-center rounded-lg bg-blue-500/90 hover:bg-blue-500  text-white p-2 mt-5 mb-2 ease-in-out duration-100 cursor-pointer font-medium"
            >
                Guest Log In
            </div>
            <p className="text-slate-600 text-xs font-medium flex items-center">
                Anonymously log in. Your data will not be saved.
            </p>
        </>
    )
}