// import 'keen-slider/keen-slider.min.css'
// import { useRouter } from 'next/router'
import { ReactNode } from 'react'
// import { CardInfo } from 'src/components/Blocks/CardInfo'
// import Breadcrumb from 'src/components/Breadcrumb'
// import { ButtonGroup } from 'src/components/ButtonGroup'
// import Head from 'src/components/Head'
import Layout from 'src/components/Layouts/Layout'
// import NotFound from 'src/components/NotFound'
// import { Shares } from 'src/components/Shares'
// import Slider from 'src/components/Slider'
// import { fetcher } from 'src/utilities/fetcher'
// import useSWR from 'swr'

type Props = {
  data?: any
}

const Page = (props: Props) => {
  return <div></div>
  // const { locale } = useRouter()
  // const { data } = useSWR('/api/galleries?locale=' + locale, fetcher, {
  //   initialData: props.data,
  // })

  // if (!data) <NotFound />

  // return (
  //   <>
  //     <Head
  //       title={data?.title || data?.meta?.title}
  //       description={data?.desc || data?.meta?.description}
  //       ogImage={
  //         data?.slider[0]?.image ? data.slider[0].image.cloudStorageUrl : ''
  //       }
  //     />
  //     <main className="container">
  //       <Breadcrumb className="my-3 lg:my-5" />
  //       <h1 className="hidden mb-2 text-headline text-primary">{data.title}</h1>

  //       {data.slider ? (
  //         <Slider
  //           data={data.slider}
  //           className="h-[205.71px] sm:h-[274.29px] md:h-[329.14px] lg:h-[438.86px] xl:h-[548.57px]"
  //         />
  //       ) : (
  //         <Slider />
  //       )}

  //       <div
  //         className={`flex items-center ${
  //           data.sharesAlignment == 'right' ? 'justify-end' : 'justify-start'
  //         }`}
  //       >
  //         <Shares />
  //       </div>
  //       <div className="grid gap-3 my-10 md:grid-cols-2">
  //         {data?.highlight?.highlightCard.map(
  //           ({ topic, options, menu, blockType }, key) => (
  //             <CardInfo
  //               key={key}
  //               blockType={blockType}
  //               topic={topic}
  //               options={options}
  //               menu={menu}
  //             />
  //           )
  //         )}
  //         <ButtonGroup
  //           layout={data?.highlight?.layoutPlan}
  //           map={data?.highlight?.map}
  //           streetView={data?.highlight?.streetView}
  //         />
  //       </div>
  //       <div className="grid gap-3 mb-20 lg:mb-40 md:grid-cols-2">
  //         {data?.components.map(({ topic, options, menu, blockType }, key) => (
  //           <CardInfo
  //             key={key}
  //             blockType={blockType}
  //             topic={topic}
  //             options={options}
  //             menu={menu}
  //           />
  //         ))}
  //       </div>
  //     </main>
  //   </>
  // )
}

Page.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Page

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const galleries = await fetcher(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=${locale}`
//   )

//   return {
//     props: {
//       data: galleries.docs[0],
//     },
//   }
// }

// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   const galleriesReq = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=all?limit=100`
//   )
//   const galleriesData = await galleriesReq.json()

//   let paths = [] as any
//   galleriesData.docs.forEach(({ slug }) => {
//     if (locales)
//       for (const locale of locales) {
//         const getPaths = {
//           params: {
//             slug: slug.split('/'),
//           },
//           locale,
//         }

//         paths.push(getPaths)
//       }

//     paths.push({
//       params: {
//         slug: slug.split('/'),
//       },
//     })
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// }
