import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import { ChevronRight } from "react-feather"

type Props = {
  breadcrumb: string
  href: string
  isLength: number
}

type BreadcrumbProps = {
  breadcrumb: string
  href: string
}

const convertBreadcrumb = (string: string) => {
  return string
    .replace(/(^|[\s-])\S/g, (match) => match.toUpperCase())
    .replace(/-/g, " ")
    .replace(/oe/g, "ö")
    .replace(/ae/g, "ä")
    .replace(/ue/g, "ü")
    .replace(/\?.*/, "")
}

const BreadcrumbList: React.FC<Props> = ({ breadcrumb, href, isLength }) => {
  return (
    <Fragment>
      <Link href={href}>
        <a className={isLength > 1 ? "text-primary font-bold hover:underline" : "breadcrumb--active"}>{convertBreadcrumb(breadcrumb)}</a>
      </Link>
      {isLength > 1 && <ChevronRight className="feather breadcrumb__icon" />}
    </Fragment>
  )
}

const Breadcrumb = ({ className }: { className: string }) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbProps[]>([])
  const router = useRouter()

  useEffect(() => {
    if (router) {
      let linkPath = router.asPath.split("/")
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: "/" + linkPath.slice(0, i + 1).join("/"),
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) return null

  return (
    <>
      <div className={`-intro-x breadcrumb ${className}`}>
        {breadcrumbs.map((item, index) => {
          return <BreadcrumbList key={item.href} breadcrumb={item.breadcrumb} href={item.href} isLength={breadcrumbs.length - index} />
        })}
      </div>
    </>
  )
}

export default Breadcrumb
