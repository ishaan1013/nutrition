import { AppWrapper } from "../context/state"
import "../styles/globals.scss"

function MyApp({ Component, pageProps }) {
  return( 
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  )
}

export default MyApp
