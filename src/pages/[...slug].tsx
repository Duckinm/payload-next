import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactNode } from 'react'
import Head from 'src/components/Head'
import { ContactSection } from 'src/components/Layouts/ContactSection'
import Layout from 'src/components/Layouts/Layout'
import NotFound from 'src/components/NotFound'
import RenderBlocks from 'src/components/RenderBlocks'

type Props = {
  pages?: any
}

const Page = ({ pages }: Props) => {
  if (!pages || pages == null) <NotFound />

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

Page.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Page

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const pages = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}`
  ).then((res) => res.json())

  return {
    props: {
      pages: pages.docs[0] || null,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const page = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all`
  ).then((res) => res.json())

  let paths = [] as any

  page.docs.forEach(({ slug }) => {
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
