import Link from 'next/link'
import React from 'react'
import { Type as LinkType } from 'src/fields/link'

type Props = {
  className?: string
} & LinkType

const CMSLink: React.FC<Props> = ({ type, page, url, children, className }) => {
  const isRelativeURL = url?.indexOf('/') === 0

  if (type === 'page' || isRelativeURL) {
    return (
      <Link href={page ? `/gallery/${page.value.slug}` : '#'} scroll={false}>
        <a className={className}>{children}</a>
      </Link>
    )
  }

  return (
    <Link href={`${url ? url : '#'}`}>
      <a className={className} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    </Link>
  )
}

export default CMSLink
