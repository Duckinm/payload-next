import Head from 'components/Head'
import { ContactSection } from 'components/Layouts/ContactSection'
import Layout from 'components/Layouts/Layout'
import NotFound from 'components/NotFound'
import RenderBlocks from 'components/RenderBlocks'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'

const Page = ({ pages }) => {
  if (!pages) <NotFound />

  return (
    <>
      <Head
        title={pages?.title || pages?.meta?.title}
        description={pages?.desc || pages?.meta?.description}
        ogImage={
          pages?.layout?.heroImage
            ? pages.layout[0].heroImage?.cloudStorageUrl
            : ''
        }
      />
      <main>
        <RenderBlocks layout={pages?.layout} className="flex flex-col" />
        <ContactSection />
      </main>
    </>
  )
}

Page.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Page

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const slug = params?.slug || 'home'
  let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}&where[slug][equals]=${slug}`

  const pageReq = await fetch(url)
  const pageData = await pageReq.json()

  return {
    props: {
      pages: pageData.docs[0],
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths = [] as any
  let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all&limit=100`

  const pageReq = await fetch(url)
  const pageData = await pageReq.json()

  if (locales) {
    pageData.docs.forEach((doc) => {
      for (const locale of locales) {
        paths.push({
          params: {
            slug: doc.slug.split('/') == '/home' ? '/' : doc.slug.split('/'),
          },
          locale,
        })
      }
    })
  } else {
    pageData.docs.forEach((doc) => {
      paths.push({
        params: {
          slug: doc.slug.split('/') == '/home' ? '/' : doc.slug.split('/'),
        },
      })
    })
  }

  return {
    paths,
    fallback: false,
  }
}
