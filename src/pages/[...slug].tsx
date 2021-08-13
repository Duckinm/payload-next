import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactNode } from 'react'
import Head from 'src/components/Head'
import { ContactSection } from 'src/components/Layouts/ContactSection'
import Layout from 'src/components/Layouts/Layout'
import NotFound from 'src/components/NotFound'
import RenderBlocks from 'src/components/RenderBlocks'

type Props = {
  page?: any
  gallery?: any
}

const Page = ({ page }: Props) => {
  if (!page || page == null) <NotFound />

  let hostname
  if (typeof window !== 'undefined') {
    hostname = window.origin
  }

  return (
    <>
      <Head
        title={page?.title || page?.meta?.title}
        description={page?.desc || page?.meta?.description}
        ogImage={
          page?.layout[0]?.heroImage
            ? page.layout[0].heroImage?.cloudStorageUrl
            : ''
        }
      />
      <main>
        <RenderBlocks layout={page?.layout} className="flex flex-col" />
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
