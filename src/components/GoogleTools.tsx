import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as ga from 'src/lib/gtag'
import * as gtm from 'src/lib/gtm'

// type Props = {
//   id: string
// }

const GoogleTools = ({ children, id }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL, id) => {
      ga.pageview(url, id)
      gtm.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [id, router.events])

  return children
}

export default GoogleTools
