import '@/styles/globals.css'
import { Playfair_Display, Roboto, Montserrat } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-playfair: ${playfair.style.fontFamily};
          --font-roboto: ${roboto.style.fontFamily};
          --font-montserrat: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
