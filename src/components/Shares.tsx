import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Facebook, Linkedin, Mail, Twitter } from 'react-feather'
import { CopyUrlButton } from 'src/components/CopyClipboard'
import { LineIcon } from 'src/components/icons/LineIcon'
import SocialButton from 'src/components/icons/SocialButton'

type Props = {
  settings?: any
}

export const Shares = ({ settings }: Props) => {
  const { asPath } = useRouter()

  let hostname
  if (typeof window !== 'undefined') {
    hostname = window.origin
  }

  return (
    <>
      <div className="flex items-center justify-end my-5 space-x-5">
        <div className="text-2xl font-minimal">Shares:</div>

        {settings?.shares?.facebook && (
          <SocialButton name="FacebookShareButton" url={`${hostname}${asPath}`}>
            <Facebook />
          </SocialButton>
        )}
        {settings?.shares?.twitter && (
          <SocialButton name="TwitterShareButton" url={`${hostname}${asPath}`}>
            <Twitter />
          </SocialButton>
        )}
        {settings?.shares?.linkedin && (
          <SocialButton name="LinkedinShareButton" url={`${hostname}${asPath}`}>
            <Linkedin />
          </SocialButton>
        )}
        {settings?.shares?.linkedin && (
          <SocialButton name="LineShareButton" url={`${hostname}${asPath}`}>
            <LineIcon fill="#000" hoverFill="#000" />
          </SocialButton>
        )}
        {settings?.shares?.linkedin && (
          <SocialButton name="EmailShareButton" url={`${hostname}${asPath}`}>
            <Mail />
          </SocialButton>
        )}
        <CopyUrlButton url={`${hostname}${asPath}`} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settings = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings`
  ).then((res) => res.json())

  return {
    props: {
      settings: settings,
    },
  }
}
