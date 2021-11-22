import { CopyUrlButton } from "components/CopyClipboard"
import { LineIcon } from "components/icons/LineIcon"
import SocialButton from "components/icons/SocialButton"
import type { Type } from "globals/Settings"
import { useRouter } from "next/router"
import React from "react"
import { Facebook, Linkedin, Mail, Twitter } from "react-feather"
import useSWR from "swr"
import { fetcher } from "utilities/fetcher"

export const Shares = () => {
  const { asPath } = useRouter()
  const { data } = useSWR<Type>("/api/globals/settings", fetcher)

  let hostname
  if (typeof window !== "undefined") {
    hostname = window.origin
  }

  const url = hostname + asPath

  return (
    <>
      <div className="flex items-center justify-end my-5 space-x-5">
        <div className="text-2xl font-minimal">Shares:</div>

        {data?.shares?.facebook && (
          <SocialButton name="FacebookShareButton" url={url}>
            <Facebook />
          </SocialButton>
        )}
        {data?.shares?.twitter && (
          <SocialButton name="TwitterShareButton" url={url}>
            <Twitter />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="LinkedinShareButton" url={url}>
            <Linkedin />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="LineShareButton" url={url}>
            <LineIcon fill="#000" hoverFill="#000" />
          </SocialButton>
        )}
        {data?.shares?.linkedin && (
          <SocialButton name="EmailShareButton" url={url}>
            <Mail />
          </SocialButton>
        )}
        <CopyUrlButton url={url} />
      </div>
    </>
  )
}
