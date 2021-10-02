import Head from 'components/Head'
import Layout from 'components/Layouts/Layout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { ChevronRight } from 'react-feather'

const GalleryCard = ({ title, description, slug, cover }) => {
  const { locale } = useRouter()

  return (
    <Link href={`/gallery/${slug ? slug : '#'}`} locale={locale}>
      <a className="flex flex-col md:flex-row bg-grey-100 rounded-[20px] md:h-[300px] shadow-lg hover:shadow-2xl hover:scale-[1.02] transition">
        <div className="w-full md:w-1/3">
          {cover ? (
            <img
              src={cover[0].image.cloudStorageUrl}
              alt={cover[0].image.alt}
              className="rounded-tl-[12px] rounded-bl-[12px] object-cover w-full h-full max-h-full border-tertiary-variants"
            />
          ) : (
            <img
              src="https://via.placeholder.com/700x500"
              alt="fake"
              className="rounded-tl-[12px] rounded-bl-[12px] object-cover w-full h-full max-h-full border-tertiary-variants"
            />
          )}
        </div>
        <div className="flex w-full p-5 md:w-2/3">
          <div className="w-auto pr-3 md:pr-8">
            <h2 className="mb-2 text-3xl font-bold leading-none text-black lg:text-4xl md:mb-4 font-minimal">
              {title}
            </h2>
            <p className="text-tertiary text-pargraph line-clamp-4 lg:line-clamp-5">
              {description
                ? description
                : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aliasquasi laudantium illum doloribus cupiditate quam amet. Distinctioamet ut optio perferendis, nostrum perspiciatis ducimus voluptateseum asperiores deserunt delectus?'}
            </p>
          </div>
          <div className="self-center justify-center hidden w-1/6 ml-auto md:flex">
            <ChevronRight className="inline-block w-10 h-10 text-tertiary" />
          </div>
        </div>
      </a>
    </Link>
  )
}

const Gallery = ({ galleries }) => {
  return (
    <>
      <Head />
      <main>
        <div className="container pt-10 mb-20 lg:mb-40">
          <h1 className="mb-8 text-5xl leading-none font-minimal text-primary">
            Types Available:
          </h1>
          <div className="flex flex-col space-y-5 lg:space-y-8">
            {galleries?.docs.map(
              ({ title, description, slug, slider }, key) => (
                <GalleryCard
                  key={key}
                  title={title}
                  description={description}
                  slug={slug}
                  cover={slider}
                />
              )
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const galleries = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries/?locale=${locale}`
  ).then((res) => res.json())

  return {
    props: {
      galleries: galleries,
    },
  }
}

Gallery.getLayout = (page: ReactElement) => <Layout>{page}</Layout>
export default Gallery
