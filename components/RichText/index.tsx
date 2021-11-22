import serialize from "components/RichText/serialize"
import React from "react"

type Props = { className?: string; content?: any }

const RichText: React.FC<Props> = ({ className, content }) => {
  if (!content) {
    return null
  }

  return <div className={className}>{serialize(content)}</div>
}

export default RichText
