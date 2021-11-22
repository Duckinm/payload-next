import type { Type } from "collections/Pages"
import { ContactSection } from "components/ContactSection"
import Head from "components/Head"
import Layout from "components/Layouts/Layout"
import NotFound from "components/NotFound"
import RenderBlocks from "components/RenderBlocks"
import { GetStaticPaths, GetStaticProps } from "next"
import { ReactElement } from "react"
import { dynamicSlugByLocale } from "utilities/dynamicSlugByLocale"

interface Props {
  pages?: Type
}

const Page = ({ pages }: Props) => {
  if (!pages) <NotFound />

  return (
    <>
      <Head />
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
  const slug = params?.slug || "home"

  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}&where[slug][equals]=${slug}`)
  const pageData = await pageReq.json()

  return {
    props: {
      pages: pageData.docs[0] ?? null,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pageReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all&limit=100`)
  const pageData = await pageReq.json()
  const paths = dynamicSlugByLocale(pageData.docs, locales)

  return {
    paths,
    fallback: true,
  }
}
