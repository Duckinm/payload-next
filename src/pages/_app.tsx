import { NextPage } from 'next'
import App, { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import '../../styles/app.scss'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  const settings = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings`
  ).then((res) => res.json())

  return {
    ...appProps,
    settings,
  }
}

export default MyApp
