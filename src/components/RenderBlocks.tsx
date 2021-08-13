import React from 'react'
import { components } from 'src/blocks'
import { Layout } from 'src/collections/Pages'

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
          return (
            <section key={i}>
              <Block {...block} />
            </section>
          )
        }

        return null
      })}
    </div>
  )
}

export default RenderBlocks
