import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import Head from 'src/components/Head'
import { ContactSection } from 'src/components/Layouts/ContactSection'
import Layout from 'src/components/Layouts/Layout'
import NotFound from 'src/components/NotFound'
import RenderBlocks from 'src/components/RenderBlocks'
import { fetcher } from 'src/utilities/fetcher'
import useSWR from 'swr'

type Props = {
  page?: any
}

const Page = (props: Props) => {
  const { locale } = useRouter()
  const { data } = useSWR('/api/pages?locale=' + locale, fetcher, {
    initialData: props.page,
  })

  if (!data || data == null) <NotFound />

  let hostname
  if (typeof window !== 'undefined') {
    hostname = window.origin
  }

  return (
    <>
      <Head
        title={data?.title || data?.meta?.title}
        description={data?.desc || data?.meta?.description}
        ogImage={
          data?.layout[0]?.heroImage
            ? data.layout[0].heroImage?.cloudStorageUrl
            : ''
        }
      />
      <main>
        <RenderBlocks layout={data?.layout} className="flex flex-col" />
        <ContactSection />
      </main>
    </>
  )
}

Page.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Page

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}`
  )
  const pageData = await pageReq.json()

  return {
    props: {
      page: pageData.docs[0] || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all?limit=100`
  )
  const pageData = await pageReq.json()
  let paths = [] as any

  pageData.docs.forEach(({ slug }) => {
    if (locales)
      for (const locale of locales) {
        const getPaths = {
          params: {
            slug: slug.split('/'),
          },
          locale,
        }

        paths.push(getPaths)
      }

    paths.push({
      params: {
        slug: slug.split('/'),
      },
    })
  })

  return {
    paths,
    fallback: false,
  }
}
