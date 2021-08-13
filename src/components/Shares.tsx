import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Facebook, Linkedin, Mail, Twitter } from 'react-feather'
import { CopyUrlButton } from 'src/components/CopyClipboard'
import { LineIcon } from 'src/components/icons/LineIcon'
import SocialButton from 'src/components/icons/SocialButton'

type Props = {
  data?: any
}

export const Shares = ({ data }: Props) => {
  const { asPath } = useRouter()

  let hostname
  if (typeof window !== 'undefined') {
    hostname = window.origin
  }

  if (!data) <div>Loading...</div>

  return (
    <>
      <div className="flex items-center justify-end my-5 space-x-5">
        <div className="text-2xl font-minimal">Shares:</div>

        <SocialButton
          name="FacebookShareButton"
          url={`${hostname}${asPath}`}
          className={data?.shares?.facebook ? 'block' : 'hidden'}
        >
          <Facebook />
        </SocialButton>
        <SocialButton
          name="TwitterShareButton"
          url={`${hostname}${asPath}`}
          className={data?.shares?.twitter ? 'block' : 'hidden'}
        >
          <Twitter />
        </SocialButton>
        <SocialButton
          name="LinkedinShareButton"
          url={`${hostname}${asPath}`}
          className={data?.shares?.linkedin ? 'block' : 'hidden'}
        >
          <Linkedin />
        </SocialButton>
        <SocialButton
          name="LineShareButton"
          url={`${hostname}${asPath}`}
          className={data?.shares?.line ? 'block' : 'hidden'}
        >
          <LineIcon fill="#000" hoverFill="#000" />
        </SocialButton>
        <SocialButton
          name="EmailShareButton"
          url={`${hostname}${asPath}`}
          className={data?.shares?.mail ? 'block' : 'hidden'}
        >
          <Mail />
        </SocialButton>
        <CopyUrlButton url={`${hostname}${asPath}`} />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settingsReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings`
  )

  const settingsData = await settingsReq.json()

  return {
    props: {
      data: settingsData,
    },
  }
}
