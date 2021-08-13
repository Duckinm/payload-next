import { useEffect, useState } from 'react'
import { Type } from 'src/blocks/Image'
import { useFirstRender } from 'src/hooks/useFirstRender'
import { useSpacer } from 'src/hooks/useSpacer'

export const Image: React.FC<Type> = ({ grid, spacer, image, type }) => {
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
      className={`${mt} ${mb} ${
        grid.size == 'container' ? 'container' : 'w-full'
      }
    ${
      grid.alignment == 'left'
        ? 'justify-start'
        : 'center'
        ? 'justify-center'
        : 'justify-end'
    } flex items-center`}
    >
      <img
        src={`${
          image ? image.cloudStorageUrl : '/images/portfolio/portfolio.png'
        }`}
        alt={`image.alt`}
        className={`${
          type == 'fullscreen' ? 'w-full' : 'wide' ? 'w-auto' : ''
        } object-cover`}
      />
    </div>
  )
}
