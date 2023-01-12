import { Provider } from 'jotai'
import '../styles/globals.css'
import { Roboto } from '@next/font/google'
import { cursorState } from '../src/state'

const font = Roboto({ subsets: ['latin'], variable: '--font-inter', weight: ['100', '300', '400', '500', '700', '900'] })

function MyApp({ Component, pageProps }) {
  return <main className={`${font.variable} font-sans`}>
    <Provider
      initialValues={[
        [cursorState, ""]
      ]}>
      <Component {...pageProps} />
    </Provider>
  </main>
}

export default MyApp
