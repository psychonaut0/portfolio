import '../styles/globals.css'
import { Roboto } from '@next/font/google'

const font = Roboto({ subsets: ['latin'], variable: '--font-inter', weight: ['100', '300', '400', '500', '700', '900'] })

function MyApp({ Component, pageProps }) {
  return <main className={`${font.variable} font-sans`}>
    <Component {...pageProps} />
  </main>
}

export default MyApp
