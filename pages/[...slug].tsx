import Head from 'components/Head'
import { ContactSection } from 'components/Layouts/ContactSection'
import Layout from 'components/Layouts/Layout'
import NotFound from 'components/NotFound'
import RenderBlocks from 'components/RenderBlocks'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'

type PathProps = {
  params: {
    slug?: string | string[]
  }
  locale?: string
}[]

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

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all&limit=100`
  ).then((res) => res.json())

  let paths: PathProps = [
    {
      params: {
        slug: '',
      },
    },
  ]
  pageReq.docs.map(({ slug }) => {
    if (locales) {
      for (const locale of locales) {
        paths.push({
          params: {
            slug: slug.split('/'),
          },
          locale,
        })
      }
    } else {
      paths.push({
        params: {
          slug: slug.split('/'),
        },
      })
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const slug = params?.slug || 'home'

  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}&where[slug][equals]=${slug}`
  )
  const pageData = await pageReq.json()

  return {
    props: {
      pages: pageData.docs[0],
    },
    revalidate: 1,
  }
}
