import { Menu, Transition } from "@headlessui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment } from "react"

type Props = {
  className?: string
}

const LocaleSwitcher = ({ className }: Props) => {
  const router = useRouter()
  const { locales, locale: activeLocale } = router
  const otherLocales = locales?.filter((locale) => locale !== activeLocale)

  return (
    <Menu as="div" className="relative inline-block w-12 text-left">
      <Menu.Button
        className={`inline-flex items-center justify-center w-full p-3 rounded-full text-xl leading-none tracking-wider font-minimal  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${className}`}
      >
        {activeLocale}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items as="ul" className="absolute right-0 z-[52] w-12 mt-1 origin-top-right bg-transparent focus:outline-none">
          {otherLocales?.map((locale, index) => {
            const { pathname, query, asPath } = router
            return (
              <Menu.Item as="li" key={locale}>
                <Link href={{ pathname, query }} as={asPath} locale={locale}>
                  <a
                    className={
                      "flex items-center justify-center w-full p-3 text-xl leading-none tracking-wider rounded-full font-minimal text-white bg-black hover:bg-opacity-40 mb-0.5" + (index % 2)
                        ? "bg-opacity-80"
                        : "bg-opacity-70"
                    }
                  >
                    {locale}
                  </a>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LocaleSwitcher
