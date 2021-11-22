import Analytics from "components/Analytics"
import Footer from "components/Footer"
import Loader from "components/Loader"
import Navbar from "components/Navbar"
import NotFound from "components/NotFound"
import { toastOptions } from "constants/toastConfig"
import { useContacts } from "hooks/swr/useContacts"
import { useMenu } from "hooks/swr/useMenu"
import { useSettings } from "hooks/swr/useSettings"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { Toaster } from "react-hot-toast"

type Props = {
  title?: string
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { locale } = useRouter()

  const { data: menu, error: menuError } = useMenu(locale)
  const { data: contacts, error: contactsError } = useContacts(locale)
  const { data: settings, error: settingsError } = useSettings(locale)

  if (!menu || !contacts || !settings) return <Loader />
  if (!menuError || !contactsError || !settingsError) return <NotFound />

  return (
    <>
      <Analytics googleTagManager={settings?.tag?.googleTagManager} googleAnalytics={settings?.tag?.googleAnalytics} />
      <Toaster position="top-center" reverseOrder={false} gutter={8} containerClassName="" containerStyle={{}} toastOptions={toastOptions} />
      <Navbar header={menu} defaultTitle="Merchance" />
      {children}
      <Footer menu={menu} settings={settings} contacts={contacts} />
    </>
  )
}

export default Layout
