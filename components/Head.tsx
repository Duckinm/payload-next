import { useSettings } from "hooks/swr/useSettings"
import getConfig from "next/config"
import NextHead from "next/head"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string
}

const {
  publicRuntimeConfig: { SERVER_URL },
} = getConfig()

const defaultDescription = "Asiana Residence located at Pattaya. Nearby the Mabprachan lake also surrounding with best local people."
const defaultTitle = "Improve your living "
const titleSuffix = " - Asiana Residence"
const defaultOGImage = `${SERVER_URL}`
const defaultKeywords = "Asiana, Resident, Residence, Scandinavian, Lifestyle, Mabprachan"

const Head: React.FC<Props> = ({ title, description, ogImage, keywords }) => {
  const { asPath } = useRouter()

  const { data: settings } = useSettings()

  const getTitle = () => {
    if (title) return title + titleSuffix
    return defaultTitle + titleSuffix
  }

  return (
    <NextHead>
      <title>{getTitle()}</title>
      {settings?.icon?.favicon && <link rel="icon" type="image/x-icon" href={settings.icon.favicon.cloudStorageUrl ?? "/media/" + settings.icon.favicon.filename} />}
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

export default Head
