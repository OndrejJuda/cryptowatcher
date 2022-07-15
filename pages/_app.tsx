import '../styles/globals.css'
import { AppProps } from 'next/app'
import { Layout } from '../components'
import { AppContextProvider } from '../contexts/app-context'
import { CoinContextProvider } from '../contexts/coin-context'
import { NewsContextProvider } from '../contexts/news-context'
import Head from 'next/head'

/*
  TODO before release:
  - SSR paging and caching
*/

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider darkMode={false} setDarkMode={() => { }}>
      <CoinContextProvider coins={[]} page={1} setCoins={() => { }} setPage={() => { }}>
        <NewsContextProvider articles={[]} page={1} setArticles={() => { }} setPage={() => { }}>
          <Head>
            <title>CryptoWatcher</title>
            <link rel="icon" href='/favicon.svg' />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NewsContextProvider>
      </CoinContextProvider>
    </AppContextProvider>
  )
}

export default MyApp
