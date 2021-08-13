import { useRouter } from 'next/router'
import React from 'react'
import { Facebook, Linkedin, Mail, Twitter } from 'react-feather'
import { CopyUrlButton } from 'src/components/CopyClipboard'
import { LineIcon } from 'src/components/icons/LineIcon'
import SocialButton from 'src/components/icons/SocialButton'
import useSWR from 'swr'

export const Shares = () => {
  const { asPath } = useRouter()
  const { data } = useSWR('/api/globals/settings')

  if (!data) <div>Loading...</div>

  return (
    <>
      <div className="flex items-center justify-end my-5 space-x-5">
        <div className="text-2xl font-minimal">Shares:</div>

        <SocialButton
          name="FacebookShareButton"
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`}
          className={data?.shares?.facebook ? 'block' : 'hidden'}
        >
          <Facebook />
        </SocialButton>
        <SocialButton
          name="TwitterShareButton"
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`}
          className={data?.shares?.twitter ? 'block' : 'hidden'}
        >
          <Twitter />
        </SocialButton>
        <SocialButton
          name="LinkedinShareButton"
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`}
          className={data?.shares?.linkedin ? 'block' : 'hidden'}
        >
          <Linkedin />
        </SocialButton>
        <SocialButton
          name="LineShareButton"
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`}
          className={data?.shares?.line ? 'block' : 'hidden'}
        >
          <LineIcon fill="#000" hoverFill="#000" />
        </SocialButton>
        <SocialButton
          name="EmailShareButton"
          url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`}
          className={data?.shares?.mail ? 'block' : 'hidden'}
        >
          <Mail />
        </SocialButton>
        <CopyUrlButton url={`${process.env.NEXT_PUBLIC_SERVER_URL}${asPath}`} />
      </div>
    </>
  )
}
