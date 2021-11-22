import CMSLink from "components/CmsLink"
import FeatherIcon from "components/icons/FeatherIcon"
import { LineIcon } from "components/icons/LineIcon"
import type { Type as LinkType } from "fields/link"
import type { Type as ContactsType } from "globals/Contacts"
import type { Type as FooterType } from "globals/Menu"
import type { Type as SettingsType } from "globals/Settings"
import Link from "next/link"
import { useCallback } from "react"
import { ChevronUp } from "react-feather"

type Props = {
  menu: FooterType
  contacts: ContactsType
  settings: SettingsType
}

type MenuProps = {
  title: string
  links: Array<{ link: LinkType }>
}

type ContactProps = {
  email: string
}

type TelProps = {
  tel: string
}

type SocialProps = {
  facebook?: string
  instagram?: string
  line?: string
  twitter?: string
  youtube?: string
}

export const Menu = ({ title, links }: MenuProps) => {
  return (
    <div className="flex flex-col p-5 space-y-2">
      <h3 className="text-white text-headline-3">{title}</h3>
      {links?.map(({ link }, key) => (
        <CMSLink {...link} className="text-grey-100 text-link hover:text-white" key={key}>
          {link.label}
        </CMSLink>
      ))}
    </div>
  )
}

export const EmailList = ({ email }: ContactProps) => {
  return (
    <Link href={`mailto://${email}`}>
      <a className="text-grey-100 text-link hover:text-white">{email}</a>
    </Link>
  )
}

export const TelList = ({ tel }: TelProps) => {
  return (
    <Link href={`tel://${tel}`}>
      <a className="text-grey-100 text-link hover:text-white">{tel}</a>
    </Link>
  )
}

export const SocialContacts = ({ facebook, instagram, line, twitter, youtube }: SocialProps) => {
  return (
    <>
      {facebook && (
        <a target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125" href={facebook}>
          <FeatherIcon key="Facebook" name="Facebook" />
        </a>
      )}
      {instagram && (
        <a target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125" href={instagram}>
          <FeatherIcon key="Instagram" name="Instagram" />
        </a>
      )}
      {line && (
        <a target="_blank" rel="noopener noreferrer" className="transition-all hover:scale-125" href={line}>
          <LineIcon fill="#fff" hoverFill="#fff" />
        </a>
      )}
    </>
  )
}

const Footer: React.FC<Props> = ({ menu, contacts, settings }) => {
  const backToTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <footer className="relative bg-primary">
        <div className="container py-10 mb-2">
          <div className="grid grid-cols-1 text-gray-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {menu?.column?.map((menu, key) => (
              <Menu key={key} title={menu.title} links={menu.nav} />
            ))}
            <div className="flex flex-col p-5 space-y-2">
              {settings?.disclaimers.title && <h3 className="text-white text-headline-3">{settings.disclaimers.title}</h3>}
              {settings?.disclaimers.desc && <p className="text-grey-100 text-link">{settings.disclaimers.desc}</p>}
              {contacts?.emailList?.map((contact, key) => (
                <EmailList email={contact.email} key={key} />
              ))}
              {contacts?.telList?.map((contact, key) => (
                <TelList tel={contact.tel} key={key} />
              ))}
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="flex flex-col items-start pt-5 text-gray-800 border-t lg:items-center border-grey-100 md:flex-row md:justify-between">
            <strong className="mb-4 font-normal md:mb-0 text-grey-100 text-link">
              © Copyright 2021 |
              {settings?.brand && (
                <Link href="/">
                  <a className="ml-2">{settings.brand}</a>
                </Link>
              )}
            </strong>
            <div className="flex items-center space-x-4 text-white">
              <SocialContacts facebook={contacts.facebook} instagram={contacts.instagram} line={contacts.line} />
              <button type="button" onClick={backToTop} className="hidden p-2 lg:block bg-primary-variants">
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
