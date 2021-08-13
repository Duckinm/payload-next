import { Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BarChart2, X } from 'react-feather'
import CMSLink from 'src/components/CmsLink'
import { Logo } from 'src/components/icons/Logo'
import LocaleSwitcher from 'src/components/LocaleSwitcher'
import { Type as HeaderType } from 'src/globals/Menu'
import { useScroll } from 'src/hooks/useScroll'
import { fetcher } from 'src/utilities/fetcher'
import useSWR from 'swr'

type Props = {
  header: HeaderType
}

const Nav = ({ header }) => {
  const { data: settings } = useSWR('/api/globals/settings', fetcher)
  const [scrollDir] = useScroll()
  const [isOpen, setIsOpen] = useState(false)
  const { asPath, locale } = useRouter()

  const noHome = asPath !== '/' && asPath !== '/home'
  const navbar = (path) => {
    if (path === '/' || path === '/home') {
      if (scrollDir === 'up')
        return 'fixed shadow-lg bg-white/60 backdrop-blur-lg'
      if (scrollDir === 'down') return 'hidden'
      return 'fixed bg-transparent'
    }
    return 'sticky bg-white/60 backdrop-blur-lg'
  }

  return (
    <nav
      className={`top-0 z-50 h-[80px] w-full transition duration-700 ease-in-out ${navbar(
        asPath
      )}`}
    >
      <div className="container flex items-center h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 mr-auto">
            <Link href="/">
              <a>
                {settings?.icon?.logo ? (
                  <img
                    src={settings.icon.logo.cloudStorageUrl}
                    alt={settings.icon.logo.alt}
                    className="object-cover h-[40px] w-[40px]"
                  />
                ) : (
                  <Logo
                    width={141}
                    height={40}
                    fill={scrollDir === 'up' || noHome ? '#545451' : '#fff'}
                    hoverFill={
                      scrollDir === 'up' || noHome ? '#635943' : '#545451'
                    }
                  />
                )}
              </a>
            </Link>
          </div>
          <div className="hidden mr-5 md:block">
            <div className="flex items-baseline ml-10 space-x-4">
              {(Array.isArray(header?.nav) && header.nav.length) > 0 && (
                <ul className="hidden md:flex lg:items-stretch lg:justify-end">
                  {header?.nav?.map(({ link }) => (
                    <li
                      key={link.label}
                      className={` ${
                        scrollDir === 'up' || noHome
                          ? 'text-tertiary hover:contrast-200'
                          : 'text-white hover:contrast-75'
                      } relative flex items-center px-4 py-2 text-2xl flex-no-grow flex-no-shrink font-minimal transition `}
                    >
                      <CMSLink {...link}>{link.label}</CMSLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {locale && (
            <LocaleSwitcher
              className={`${
                scrollDir === 'up' || noHome
                  ? 'bg-black bg-opacity-10 backdrop-blur-md text-tertiary'
                  : 'bg-black bg-opacity-20 backdrop-blur-md text-white'
              }`}
            />
          )}
        </div>
        <div className="flex ml-2 -mr-2 md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className={`${
              scrollDir === 'up' || noHome ? 'text-tertiary' : 'text-white'
            } inline-flex items-center justify-center p-2 rounded-md  focus:outline-none`}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <BarChart2 className="w-8 h-8 transform -rotate-90" />
            ) : (
              <X className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {(Array.isArray(header?.nav) && header.nav.length) > 0 && (
                <ul
                  role="menu"
                  className={`${
                    scrollDir === 'up' || noHome
                      ? 'shadow-lg bg-white/95 backdrop-blur-2xl'
                      : 'bg-white/40 backdrop-blur-md'
                  }  rounded-md shadow-lg`}
                >
                  {header?.nav?.map(({ link }) => (
                    <li
                      key={link.label}
                      className={`${
                        scrollDir === 'up' || noHome
                          ? 'text-tertiary'
                          : 'text-tertiary contrast-150'
                      } flex w-full px-4 py-2 text-2xl  hover:contrast-200 font-minimal`}
                    >
                      <CMSLink {...link}>{link.label}</CMSLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  )
}

export default Nav
