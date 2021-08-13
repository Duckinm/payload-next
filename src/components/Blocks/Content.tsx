import { useEffect, useState } from 'react'
import { Type } from 'src/blocks/Content'
import { useFirstRender } from 'src/hooks/useFirstRender'
import { useSpacer } from 'src/hooks/useSpacer'

export const Content: React.FC<Type> = ({ content, container, spacer }) => {
  const firstRender = useFirstRender()
  const [marginBottom, marginTop] = useSpacer(spacer)
  const [mt, setMt] = useState<string>('')
  const [mb, setMb] = useState<string>('')

  useEffect(() => {
    if (!firstRender) {
      if (marginTop) setMt(marginTop)
      if (marginBottom) setMb(marginBottom)
    }
  }, [firstRender, marginBottom, marginTop])

  return (
    <div
      style={{ backgroundColor: container.color ? container.color : '#fff' }}
    >
      <div
        className={`
        ${container.grid.size == 'container' ? 'container' : 'w-full'}
         ${
           container.grid.alignment == 'left'
             ? 'items-start'
             : 'center'
             ? 'items-center'
             : 'items-end'
         } ${mb} ${mt} flex flex-col mx-3 lg:mx-5`}
      >
        <h1
          className="mb-3 lg:mb-8 text-display"
          style={{
            color: content?.title?.color ? content.title.color : '#000',
          }}
        >
          {content?.title?.text
            ? content.title.text
            : 'Cherish all your happy moments'}
        </h1>
        <p
          className="leading-snug lg:w-1/2 lg:text-center text-headline-2 text-tertiary"
          style={{
            color: content?.description?.color
              ? content.description.color
              : '#000',
          }}
        >
          {content?.description?.text
            ? content.description.text
            : 'At Asiana Residences, We make a fine cushion for customers. Join us to become our family.'}
        </p>
      </div>
    </div>
  )
}
