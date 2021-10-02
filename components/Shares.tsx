import { CopyUrlButton } from 'components/CopyClipboard'
import { LineIcon } from 'components/icons/LineIcon'
import SocialButton from 'components/icons/SocialButton'
import { useRouter } from 'next/router'
import React from 'react'
import { Facebook, Linkedin, Mail, Twitter } from 'react-feather'
import useSWR from 'swr'
import { fetcher } from 'utilities/fetcher'

type Props = {
  data?: any
}

export const Shares = (props: Props) => {
  const { asPath } = useRouter()
  const { data } = useSWR('/api/globals/settings', fetcher, {
    initialData: props.data,
  })

  let hostname
  if (typeof window !== 'undefined') {
    hostname = window.origin
  }

  return (
    <>
      <div className="flex items-center justify-end my-5 space-x-5">
        <div className="text-2xl font-minimal">Shares:</div>

        {data?.shares?.facebook && (
          <SocialButton name="FacebookShareButton" url={`${hostname}${asPath}`}>
            <Facebook />
          </SocialButton>
        )}
        {data?.shares?.twitter && (
          <SocialButton name="TwitterShareButton" url={`${hostname}${asPath}`}>
            <Twitter />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="LinkedinShareButton" url={`${hostname}${asPath}`}>
            <Linkedin />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="LineShareButton" url={`${hostname}${asPath}`}>
            <LineIcon fill="#000" hoverFill="#000" />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="EmailShareButton" url={`${hostname}${asPath}`}>
            <Mail />
          </SocialButton>
        )}
        <CopyUrlButton url={`${hostname}${asPath}`} />
      </div>
    </>
  )
}
