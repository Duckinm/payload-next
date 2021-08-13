// import { GetStaticProps } from 'next'
// import Page, {
//   getStaticProps as sharedGetStaticProps,
// } from 'src/pages/[...slug]'

// export default Page
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const func = sharedGetStaticProps.bind(this)

//   return func(ctx)
// }

import { ReactNode } from 'react'
import Layout from 'src/components/Layouts/Layout'

type Props = {
  pages?: any
}

const Page = (props: Props) => {
  return <div></div>
}

Page.getLayout = (page: ReactNode) => <Layout>{page}</Layout>
export default Page
