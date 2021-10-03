import { CardInfo } from 'components/Blocks/CardInfo'
import Breadcrumb from 'components/Breadcrumb'
import { ButtonGroup } from 'components/ButtonGroup'
import Head from 'components/Head'
import Layout from 'components/Layouts/Layout'
import NotFound from 'components/NotFound'
import { Shares } from 'components/Shares'
import Slider from 'components/Slider'
import 'keen-slider/keen-slider.min.css'
import { GetStaticPaths, GetStaticProps } from 'next'
import { ReactElement } from 'react'

type PathProps = {
  params: {
    slug: string | string[]
  }
  locale?: string
}[]

const Page = ({ galleries }) => {
  if (!galleries) <NotFound />

  return (
    <>
      <Head
        title={galleries?.title || galleries?.meta?.title}
        description={galleries?.desc || galleries?.meta?.description}
        ogImage={
          galleries?.slider ? galleries.slider[0].image.cloudStorageUrl : ''
        }
      />
      <main className="container">
        <Breadcrumb className="my-3 lg:my-5" />
        {galleries?.title && (
          <h1 className="hidden mb-2 text-headline text-primary">
            {galleries.title}
          </h1>
        )}

        {galleries?.slider && (
          <Slider
            data={galleries.slider}
            className="h-[205.71px] sm:h-[274.29px] md:h-[329.14px] lg:h-[438.86px] xl:h-[548.57px]"
          />
        )}

        <div
          className={`flex items-center ${
            galleries?.sharesAlignment == 'right'
              ? 'justify-end'
              : 'justify-start'
          }`}
        >
          <Shares />
        </div>
        <div className="grid gap-3 my-10 md:grid-cols-2">
          {galleries?.highlight?.highlightCard.map(
            ({ topic, options, menu, blockType }, key) => (
              <CardInfo
                key={key}
                blockType={blockType}
                topic={topic}
                options={options}
                menu={menu}
              />
            )
          )}
          <ButtonGroup
            layout={galleries?.highlight?.layoutPlan}
            map={galleries?.highlight?.map}
            streetView={galleries?.highlight?.streetView}
          />
        </div>
        <div className="grid gap-3 mb-20 lg:mb-40 md:grid-cols-2">
          {galleries?.components?.map(
            ({ topic, options, menu, blockType }, key) => (
              <CardInfo
                key={key}
                blockType={blockType}
                topic={topic}
                options={options}
                menu={menu}
              />
            )
          )}
        </div>
      </main>
    </>
  )
}

Page.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Page

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const galleriesReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=${locale}&where[slug][equals]=${params?.slug}`
  )
  const galleriesData = await galleriesReq.json()

  return {
    props: {
      galleries: galleriesData.docs[0],
    },
    // revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const galleriesReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=all&limit=100`
  )
  const galleriesData = await galleriesReq.json()

  let paths: PathProps = []
  galleriesData.docs.forEach(({ slug }) => {
    if (locales) {
      for (const locale of locales) {
        paths.push({ params: { slug: slug }, locale })
      }
    } else {
      paths.push({ params: { slug: slug } })
    }
  })

  return {
    paths,
    fallback: false,
  }
}
