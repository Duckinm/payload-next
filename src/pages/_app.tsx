import type { NextComponentType } from 'next'
import App, { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import { ReactNode } from 'react'
import '../../styles/app.scss'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
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
