import { Type } from 'blocks/Features'
import { Type as GalleriesType } from 'collections/Galleries'
import { Type as MediaType } from 'collections/Media'
import Slider from 'components/Slider'
import { Type as SpacerType } from 'fields/spacer'
import { useFirstRender } from 'hooks/useFirstRender'
import { useSpacer } from 'hooks/useSpacer'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'react-feather'

type Props = {
  spacer: SpacerType
  align: 'left' | 'right'
  slider: {
    image: MediaType
  }[]
  starred: {
    value: GalleriesType
  }
  buttonColor?: string
}

const FeatureCard: React.FC<Props> = ({
  spacer,
  align,
  slider,
  starred,
  buttonColor,
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
    <div className={`${mb} ${mt} lg:grid lg:grid-cols-3`}>
      <div
        className={`${align == 'right' ? 'lg:col-start-2' : ''} lg:col-span-2`}
      >
        <Slider data={slider} className="xl:h-[540.88px] mb-8" />
      </div>

      <div
        className={`${
          align == 'right' ? 'lg:row-start-1 text-left' : 'text-right'
        } px-4 `}
      >
        <h2 className="mb-2 text-6xl font-bold leading-none text-uppercase font-minimal text-primary">
          {starred.value.title ? starred.value.title : 'Storey House'}
        </h2>
        <p className="text-grey-800 font-minimal text-[28px] leading-none mb-8">
          {starred.value.description
            ? starred.value.description
            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore sunt pariatur, maiores iusto dignissimos quas eum magnam, maxime eaque provident libero quia quam accusamus saepe corrupti cupiditate praesentium. Ab, inventore?'}
        </p>
        <div
          className={`${
            align == 'right' ? 'justify-start' : 'justify-end'
          } flex items-center text-2xl font-minimal text-tertiary`}
        >
          View More
          <a
            href={`/gallery/${starred.value.slug}`}
            className="inline-block p-3 ml-3 rounded-full text-tertiary hover:contrast-200"
            style={{ backgroundColor: buttonColor ? buttonColor : '#fff' }}
          >
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export const Features: React.FC<Type> = ({
  title,
  section,
  color,
  blockType,
}) => {
  return (
    <div
      style={{ backgroundColor: color ? color : '#fff' }}
      className="relative"
    >
      <div
        style={{ color: title.color ? title.color : '#000' }}
        className="top-0 flex justify-center w-full my-20 text-center underline lg:pt-0 text-display-2 lg:no-underline"
      >
        {title?.text}
      </div>
      <div className="container xl:max-w-screen-2xl">
        {section.map(
          ({ spacer, starred, alignment, slider, buttonColor }, key) => (
            <FeatureCard
              spacer={spacer}
              align={alignment}
              slider={slider}
              starred={starred}
              buttonColor={buttonColor?.color}
              key={key}
            />
          )
        )}
      </div>
    </div>
  )
}
