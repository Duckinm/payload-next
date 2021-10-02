import Analytics from 'components/Analytics'
import Footer from 'components/Layouts/Footer'
import Navbar from 'components/Layouts/Navbar'
import GlobalCustomAlert from 'components/Toast'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import useSWR from 'swr'
import { fetcher } from 'utilities/fetcher'
import Loader from '../Loader'

type Props = {
  title?: string
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { locale } = useRouter()

  const { data: menu } = useSWR('/api/globals/menu?locale=' + locale, fetcher)
  const { data: contacts } = useSWR('/api/globals/contacts', fetcher)
  const { data: settings } = useSWR('/api/globals/settings', fetcher)

  if (!menu || !contacts) return <Loader />

  return (
    <>
      <Analytics
        googleTagManager={settings?.tag?.googleTagManager}
        googleAnalytics={settings?.tag?.googleAnalytics}
      />
      <GlobalCustomAlert />
      <Navbar header={menu} />
      {children}
      <Footer footer={menu} contacts={contacts} />
    </>
  )
}

export default Layout
