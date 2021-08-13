import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import Footer from 'src/components/Layouts/Footer'
import Navbar from 'src/components/Layouts/Navbar'
import GlobalCustomAlert from 'src/components/Toast'
import useSWR from 'swr'

type Props = {
  title?: string
  children: ReactNode
}

const Layout = (props: Props) => {
  const { children } = props
  const { locale } = useRouter()

  const { data: menu } = useSWR('/api/globals/menu?locale=' + locale)
  const { data: contacts } = useSWR('/api/globals/contacts')

  if (!menu || !contacts) return <div>Loading...</div>

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
