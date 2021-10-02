import { components } from 'blocks'
import { Layout } from 'collections/Pages'
import React from 'react'

type Props = {
  layout: Layout[]
  className?: string
}

const RenderBlocks: React.FC<Props> = ({ layout, className }) => {
  return (
    <div className={[className].filter(Boolean).join(' ')}>
      {layout?.map((block, i) => {
        const Block: React.FC<any> = components[block.blockType]

        if (Block) {
          return <Block {...block} key={i} />
        }

        return null
      })}
    </div>
  )
}

export default RenderBlocks
