// import { useRouter } from 'next/router'
import { ReactNode } from 'react'
// import Head from 'src/components/Head'
// import { ContactSection } from 'src/components/Layouts/ContactSection'
import Layout from 'src/components/Layouts/Layout'
// import NotFound from 'src/components/NotFound'
// import RenderBlocks from 'src/components/RenderBlocks'
// import { fetcher } from 'src/utilities/fetcher'
// import useSWR from 'swr'

type Props = {
  pages?: any
}

const Page = (props: Props) => {
  return <div></div>
  // const { locale } = useRouter()
  // const { data } = useSWR('/api/galleries?locale=' + locale, fetcher, {
  //   initialData: props.pages,
  // })

  // if (!data || data == null) <NotFound />

  // return (
  //   <>
  //     <Head
  //       title={data?.title || data?.meta?.title}
  //       description={data?.desc || data?.meta?.description}
  //       ogImage={
  //         data?.layout?.heroImage
  //           ? data.layout[0].heroImage?.cloudStorageUrl
  //           : ''
  //       }
  //     />
  //     <main>
  //       <RenderBlocks layout={data?.layout} className="flex flex-col" />
  //       <ContactSection />
  //     </main>
  //   </>
  // )
}

Page.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Page

// export const getStaticProps: GetStaticProps = async ({ locale }) => {
//   const pages = await fetcher(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=${locale}`
//   )

//   return {
//     props: {
//       pages: pages.docs[0] || null,
//     },
//   }
// }

// export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
//   const page = await fetcher(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all`
//   )
//   let paths = [] as any

//   page.docs.forEach(({ slug }) => {
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
