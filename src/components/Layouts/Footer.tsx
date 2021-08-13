import Link from 'next/link'
import React, { useCallback } from 'react'
import { ChevronUp } from 'react-feather'
import CMSLink from 'src/components/CmsLink'
import FeatherIcon from 'src/components/icons/FeatherIcon'
import { LineIcon } from 'src/components/icons/LineIcon'
import { Type as ContactsType } from 'src/globals/Contacts'
import { Type as FooterType } from 'src/globals/Menu'

type Props = {
  footer: FooterType
  contacts: ContactsType
}

const Footer: React.FC<Props> = ({ footer, contacts }) => {
  const backToTop = useCallback(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <img src="/images/shape.svg" alt="" className="w-full -mb-1" />
      <footer className="relative bg-primary">
        <div className="container py-10 mb-2">
          <div className="grid grid-cols-1 text-gray-800 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {footer?.column?.map(({ title, nav }, key) => (
              <div key={key} className="flex flex-col p-5 space-y-2">
                <h3 className="text-white text-headline-3">{title}</h3>
                {nav?.map(({ link }, key) => (
                  <CMSLink
                    {...link}
                    className="text-grey-100 text-link hover:text-white"
                    key={key}
                  >
                    {link.label}
                  </CMSLink>
                ))}
              </div>
            ))}
            <div className="flex flex-col p-5 space-y-2">
              <h3 className="text-white text-headline-3">{footer?.title}</h3>
              <p className="text-grey-100 text-link">{footer?.desc}</p>
              {contacts?.emailList?.map(({ email }, key) => (
                <Link href={`mailto://${email}`} key={key}>
                  <a className="text-grey-100 text-link hover:text-white">
                    {email}
                  </a>
                </Link>
              ))}
              {contacts?.telList?.map(({ tel }, key) => (
                <Link href={`tel://${tel}`} key={key}>
                  <a className="text-grey-100 text-link hover:text-white">
                    {tel}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="container py-5">
          <div className="flex flex-col items-start pt-5 text-gray-800 border-t lg:items-center border-grey-100 md:flex-row md:justify-between">
            <strong className="mb-4 font-normal md:mb-0 text-grey-100 text-link">
              © Copyright 2021 |
              <Link href="/">
                <a className="ml-2">{footer?.brand}</a>
              </Link>
            </strong>
            <div className="flex items-center space-x-4 text-white">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-125"
                href={contacts?.facebook}
              >
                <FeatherIcon key="Facebook" name="Facebook" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-125"
                href={contacts?.instagram}
              >
                <FeatherIcon key="Instagram" name="Instagram" />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all hover:scale-125"
                href={contacts?.line}
              >
                <LineIcon fill="#fff" hoverFill="#fff" />
              </a>
              <button
                type="button"
                onClick={backToTop}
                className="hidden p-2 lg:block bg-primary-variants"
              >
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
