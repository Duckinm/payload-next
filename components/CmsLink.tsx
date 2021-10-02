import { Type as LinkType } from 'fields/link'
import Link from 'next/link'
import React from 'react'

type Props = {
  className?: string
} & LinkType

const CMSLink: React.FC<Props> = ({
  type,
  page,
  url,
  children,
  className,
  checkbox = false,
}) => {
  // const isRelativeURL = url?.indexOf('/') === 0

  if (type === 'page') {
    return (
      <Link href={`/gallery/${page?.value?.slug}`} scroll={false}>
        <a className={className}>{children}</a>
      </Link>
    )
  }

  return (
    <Link href={url ? url : '#'}>
      <a
        className={className}
        rel={checkbox ? 'noopener noreferrer' : ''}
        target={checkbox ? '_blank' : ''}
      >
        {children}
      </a>
    </Link>
  )
}

export default CMSLink
