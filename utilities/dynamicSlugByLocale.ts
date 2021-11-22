type TempArrayProps = {
  params: {
    slug: string[] | string
  }
  locale?: string
}

export const dynamicSlugByLocale = (data: [], locales?: string[] | string) => {
  let temp: TempArrayProps[] = []

  data.forEach(({ slug }) => {
    if (locales) {
      for (const locale of locales) {
        temp.push({ params: { slug: [slug] }, locale })
      }
    } else {
      temp.push({ params: { slug: [slug] } })
    }
  })

  return temp
}
