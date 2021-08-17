import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import Footer from 'src/components/Layouts/Footer'
import Navbar from 'src/components/Layouts/Navbar'
import GlobalCustomAlert from 'src/components/Toast'
import { fetcher } from 'src/utilities/fetcher'
import useSWR from 'swr'
import Loader from '../Loader'

type Props = {
  title?: string
  children: ReactNode
}

const Layout = (props: Props) => {
  const { children } = props
  const { locale } = useRouter()

  const { data: menu } = useSWR('/api/globals/menu?locale=' + locale, fetcher)
  const { data: contacts } = useSWR('/api/globals/contacts', fetcher)

  if (!menu || !contacts) return <Loader />

  return (
    <>
      <GlobalCustomAlert />
      <Navbar header={menu} />
      {children}
      <Footer footer={menu} contacts={contacts} />
    </>
  )
}

export default Layout
