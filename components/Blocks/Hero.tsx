import { Type } from 'blocks/Hero'
import { Type as GalleriesType } from 'collections/Galleries'
import { Type as BorderType } from 'fields/border'
import { ChevronRight } from 'react-feather'

type Props = {
  starred: {
    value: GalleriesType
  }
  border: BorderType
  backgroundColor?: string
  titleColor?: string
  descColor?: string
}

const HeroCard: React.FC<Props> = ({
  starred,
  border,
  backgroundColor,
  titleColor,
  descColor,
}) => {
  const strokeSize = border.stroke.strokeSize
  const roundSize = border.style.roundSize

  let strokeSide = ['0px', '0px', '0px', '0px']
  let roundSide = ['0px', '0px', '0px', '0px']

  if (border.isLine)
    for (const side of border?.stroke.strokeSide) {
      if (side.indexOf('top') > -1) strokeSide[0] = strokeSize
      if (side.indexOf('right') > -1) strokeSide[1] = strokeSize
      if (side.indexOf('bottom') > -1) strokeSide[2] = strokeSize
      if (side.indexOf('left') > -1) strokeSide[3] = strokeSize
    }

  if (border.isRound)
    for (const side of border?.style.roundSide) {
      if (side.indexOf('topleft') > -1) roundSide[0] = roundSize
      if (side.indexOf('topright') > -1) roundSide[1] = roundSize
      if (side.indexOf('bottomright') > -1) roundSide[2] = roundSize
      if (side.indexOf('bottomleft') > -1) roundSide[3] = roundSize
    }

  return (
    <a
      href={`/gallery/${starred.value.slug}`}
      className="w-[85%] cursor-pointer sm:w-2/3 md:w-1/2 lg:w-1/3 flex px-2 py-2 md:py-4 space-x-2 opacity-95 backdrop-blur-xl shadow-lg transition hover:scale-[1.03] hover:shadow-2xl"
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
        borderColor: border.isLine ? border.stroke.color : '#fff',
        borderWidth: border.isLine ? strokeSide.join(' ') : '0px',
        borderRadius: border.isRound ? roundSide.join(' ') : '0px',
      }}
    >
      <div className="w-1/4">
        <img
          src={starred.value.slider[0].image.cloudStorageUrl}
          alt={starred.value.slider[0].image.alt}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
      <div className="flex items-start w-3/4">
        <div className="w-auto px-1">
          <h3
            className="text-2xl leading-none font-minimal"
            style={{ color: titleColor ? titleColor : '#000' }}
          >
            {starred.value.title ? starred.value.title : 'Lorem Ipsum'}
          </h3>
          <p
            className="leading-none line-clamp-2 md:line-clamp-3 font-minimal"
            style={{ color: descColor ? descColor : '#000' }}
          >
            {starred.value.description
              ? starred.value.description
              : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using tmaking it look like readable English.'}
          </p>
        </div>
        <div className="self-center w-1/6">
          <ChevronRight className="block" />
        </div>
      </div>
    </a>
  )
}

export const Hero: React.FC<Type> = ({ card, heroImage }) => {
  return (
    <section>
      <img
        src={heroImage.cloudStorageUrl}
        alt={heroImage.alt}
        className="object-cover object-bottom w-full h-full"
      />
      <div className="container relative flex flex-col items-center md:flex-row space-y-1 md:space-y-0 justify-center space-x-0.5 mt-[-20px] md:mt-[-60px]">
        {card.map(
          (
            { backgroundColor, border, starred, titleColor, descColor },
            key
          ) => (
            <HeroCard
              key={key}
              starred={starred}
              border={border}
              titleColor={titleColor?.color}
              descColor={descColor?.color}
              backgroundColor={backgroundColor?.color}
            />
          )
        )}
      </div>
    </section>
  )
}
