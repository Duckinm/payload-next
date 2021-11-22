import { Type as SettingsType } from "globals/Settings"
import { GetStaticProps } from "next"
import getConfig from "next/config"
import NextHead from "next/head"
import { useRouter } from "next/router"
import React from "react"

const {
  publicRuntimeConfig: { SERVER_URL },
} = getConfig()

const defaultDescription = "Asiana Residence located at Pattaya. Nearby the Mabprachan lake also surrounding with best local people."
const defaultTitle = "Improve your living "
const titleSuffix = " - Asiana Residence"
const defaultOGImage = `${SERVER_URL}/images/hero.jpg`
const defaultKeywords = "Asiana, Resident, Residence, Scandinavian, Lifestyle, Mabprachan"

type Props = {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string
  settings?: SettingsType
}

const Head: React.FC<Props> = ({ title, description, ogImage, keywords, settings }) => {
  const { asPath } = useRouter()

  const getTitle = () => {
    if (title) return title + titleSuffix
    return defaultTitle + titleSuffix
  }

  return (
    <NextHead>
      <title>{getTitle()}</title>
      <link rel="icon" type="image/x-icon" href={`${settings?.icon?.favicon ? settings.icon.favicon.cloudStorageUrl ?? "/media/" + settings.icon.favicon.filename : "/images/logo/logo-only.svg"}`} />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={`${SERVER_URL}${asPath}`} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:site" content="@payloadcms" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
    </NextHead>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const settingsReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/settings`)

  const settingsData = await settingsReq.json()

  return {
    props: {
      settings: settingsData,
    },
  }
}

export default Head
