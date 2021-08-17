import { GetStaticProps } from 'next'
import React, { ReactNode } from 'react'
import Footer from 'src/components/Layouts/Footer'
import Navbar from 'src/components/Layouts/Navbar'
import GlobalCustomAlert from 'src/components/Toast'
import { Type as ContactsType } from 'src/globals/Contacts'
import { Type as MenuType } from 'src/globals/Menu'
import Loader from '../Loader'

type Props = {
  children: ReactNode
  menu?: MenuType
  contacts?: ContactsType
}

const Layout = ({ children, menu, contacts }: Props) => {
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

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const menu = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/menu?locale=${locale}`
  ).then((res) => res.json())

  const contacts = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/contacts`
  ).then((res) => res.json())

  return {
    props: {
      menu: menu,
      contacts: contacts,
    },
  }
}

export default Layout
