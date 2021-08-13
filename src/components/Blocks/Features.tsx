import { useEffect, useState } from 'react'
import { ArrowRight } from 'react-feather'
import { Type } from 'src/blocks/Features'
import { Type as GalleriesType } from 'src/collections/Galleries'
import { Type as MediaType } from 'src/collections/Media'
import Slider from 'src/components/Slider'
import { Type as SpacerType } from 'src/fields/spacer'
import { useFirstRender } from 'src/hooks/useFirstRender'
import { useSpacer } from 'src/hooks/useSpacer'

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
        <Slider data={slider} className="xl:h-[412.88px] mb-8" />
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
        className="absolute top-[-18px] md:top-[-25px] lg:top-[-5%] left-1/2 -translate-x-1/2 flex justify-center text-display-2  w-full"
      >
        {title.text ? title.text : 'Best location in Pattaya'}
      </div>
      <div className={`container pt-20 lg:pt-40`}>
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
