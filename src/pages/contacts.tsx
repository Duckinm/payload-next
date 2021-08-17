import { GetStaticProps } from 'next'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Mail, Phone } from 'react-feather'
import Head from 'src/components/Head'
import FeatherIcon from 'src/components/icons/FeatherIcon'
import { LineIcon } from 'src/components/icons/LineIcon'
import { ContactSection } from 'src/components/Layouts/ContactSection'
import Layout from 'src/components/Layouts/Layout'
import { Type as ContactsType } from 'src/globals/Contacts'
import { Type as SettingType } from 'src/globals/Settings'

type Props = {
  settings?: SettingType
  contacts?: ContactsType
}

const Contact = ({ settings, contacts }: Props) => {
  return (
    <>
      <Head />
      <main>
        <div>
          <div className="bg-grey-100">
            <div className="container pt-20 pb-10">
              <div className="flex flex-col-reverse space-y-8 space-y-reverse md:flex-row md:space-y-0 md:space-x-8">
                <div className="w-full lg:w-1/2">
                  {settings?.googleMap ? (
                    <iframe
                      src={settings.googleMap}
                      allowFullScreen
                      loading="lazy"
                      className="block w-full border-0 h-[400px]"
                    />
                  ) : (
                    <img
                      src="/images/location.png"
                      alt="Based location | ASIANA RESIDENCE"
                      className="object-cover w-full h-full max-w-auto"
                    />
                  )}
                </div>
                <div className="w-full lg:w-1/2">
                  <h1 className="inline-block border-b-2 border-primary text-5xl text-primary font-cera tracking-[-4%] mb-12">
                    Find us?
                  </h1>
                  <div className="flex flex-col pl-10 space-y-5">
                    {contacts?.telList ? (
                      <div className="flex">
                        <Phone />
                        <div className="flex">
                          {contacts.telList?.map(({ tel }, i) =>
                            contacts.telList.length !== i + 1 ? (
                              <Link href={`tel://${tel}`} key={tel}>
                                <a className="ml-2 text-2xl leading-none font-minimal">
                                  {tel}
                                </a>
                              </Link>
                            ) : (
                              <Link href={`tel://${tel}`} key={tel}>
                                <a className="ml-2 text-2xl leading-none font-minimal">
                                  {tel}
                                </a>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {contacts?.emailList ? (
                      <div className="flex">
                        <Mail />
                        <div className="flex">
                          {contacts.emailList?.map(({ email }, i) =>
                            contacts.emailList.length !== i + 1 ? (
                              <Link href={`mailto://${email}`} key={email}>
                                <a className="ml-2 text-2xl leading-none font-minimal">
                                  {email},
                                </a>
                              </Link>
                            ) : (
                              <Link href={`mailto://${email}`} key={email}>
                                <a className="ml-2 text-2xl leading-none font-minimal">
                                  {email}
                                </a>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    {contacts?.facebook && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex"
                        href={contacts.facebook}
                      >
                        <FeatherIcon key="Facebook" name="Facebook" />
                        <div className="ml-2 text-2xl leading-none font-minimal">
                          {contacts.facebook}
                        </div>
                      </a>
                    )}
                    {contacts?.instagram && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex"
                        href={contacts.instagram}
                      >
                        <FeatherIcon key="Instagram" name="Instagram" />
                        <div className="ml-2 text-2xl leading-none font-minimal">
                          {contacts.instagram}
                        </div>
                      </a>
                    )}
                    {contacts?.line && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex"
                        href={contacts.line}
                      >
                        <LineIcon fill="#000" hoverFill="#000" />
                        <div className="ml-2 text-2xl leading-none font-minimal">
                          {contacts.line}
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContactSection />
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const settings = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings`
  ).then((res) => res.json())

  const contacts = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/contacts`
  ).then((res) => res.json())

  return {
    props: {
      settings: settings,
      contacts: contacts,
    },
  }
}

Contact.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Contact
