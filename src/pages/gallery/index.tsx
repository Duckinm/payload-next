import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { ChevronRight } from 'react-feather'
import Head from 'src/components/Head'
import Layout from 'src/components/Layouts/Layout'
import { fetcher } from 'src/utilities/fetcher'
import useSWR from 'swr'

const Card = (props) => {
  const { title, description, slug, cover } = props
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

const Gallery = () => {
  const { locale } = useRouter()
  const { data } = useSWR('/api/galleries/?locale=' + locale, fetcher)

  if (!data) return <div>Loading...</div>

  return (
    <>
      <Head />
      <main>
        <div className="container pt-10 mb-20 lg:mb-40">
          <h1 className="mb-8 text-5xl leading-none font-minimal text-primary">
            Types Available:
          </h1>
          <div className="flex flex-col space-y-5 lg:space-y-8">
            {data.docs.map(({ title, description, slug, slider }, key) => (
              <Card
                key={key}
                title={title}
                description={description}
                slug={slug}
                cover={slider}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

Gallery.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Gallery
