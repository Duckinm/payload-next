import { useEffect, useState } from 'react'
import { Type } from 'src/blocks/Sponsor'
import { useFirstRender } from 'src/hooks/useFirstRender'
import { useSpacer } from 'src/hooks/useSpacer'

export const Sponsor: React.FC<Type> = ({
  grid,
  spacer,
  content,
  imageGallery,
  color,
}) => {
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
    <div style={{ backgroundColor: color ? color : '#fff' }}>
      <div
        className={`${
          grid.size == 'full' ? 'w-full' : 'container'
        }  h-auto py-20 bg-sponsor-pattern  ${mt} ${mb}`}
      >
        <div
          className={`flex flex-col justify-center w-full h-full px-3 mx-auto md:max-w-xl ${
            grid.alignment == 'left'
              ? 'items-start'
              : 'center'
              ? 'items-center'
              : 'items-end'
          }`}
        >
          {imageGallery?.map(({ image }, key) => (
            <div key={key}>
              <img
                src={`${
                  image ? image.cloudStorageUrl : '/images/sponsor-logo.png'
                }`}
                alt={image.alt ? image.alt : 'Sponsors of ASIANA'}
                className="object-cover w-full h-full mb-20"
              />
            </div>
          ))}

          <h3
            className="mb-5 text-2xl leading-none text-center lg:text-3xl font-minimal "
            style={{
              color: content?.title?.color ? content.title.color : '#000',
            }}
          >
            {content?.title?.text
              ? content.title.text
              : 'Do you want to create your own future within real-estate and do business locally and globally?'}
          </h3>
          <p
            className="text-2xl leading-none text-center lg:text-3xl font-minimal "
            style={{
              color: content?.description?.color
                ? content.description.color
                : '#000',
            }}
          >
            {content?.description?.text
              ? content.description.text
              : 'Become a franchisee in Asiana’s quarter century old chain, you will become a part of the growing family. This will mean a safer and less risky start of your dream on local or international level'}
          </p>
        </div>
      </div>
    </div>
  )
}
