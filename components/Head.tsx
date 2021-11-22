import { useSettings } from "hooks/swr/useSettings"
import NextHead from "next/head"
import { useRouter } from "next/router"
import React from "react"

type Props = {
  title?: string
  description?: string
  ogImage?: string
  keywords?: string
}

// const {
//   publicRuntimeConfig: { SERVER_URL },
// } = getConfig()

const titleSuffix = " - Merchance"

const Head: React.FC<Props> = ({ title = "Hello World", description = "Land of mine, Merchance.", ogImage, keywords = "Merchance" }) => {
  const { asPath, basePath } = useRouter()
  const { data: settings } = useSettings()

  const titleWithSuffix = title + titleSuffix

  return (
    <NextHead>
      <title>{titleWithSuffix}</title>
      {settings?.icon?.favicon && <link rel="icon" type="image/x-icon" href={settings.icon.favicon.cloudStorageUrl ?? "/media/" + settings.icon.favicon.filename} />}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={`${basePath}${asPath}`} />
      <meta property="og:title" content={titleWithSuffix} />
      <meta property="og:description" content={description} />
      <meta property="twitter:title" content={titleWithSuffix} />
      <meta name="twitter:site" content="@payloadcms" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
    </NextHead>
  )
}

export default Head
