import { Type } from 'blocks/CtaGrid'
import { useFirstRender } from 'hooks/useFirstRender'
import { useSpacer } from 'hooks/useSpacer'
import { useEffect, useState } from 'react'
import FeatherIcon from '../icons/FeatherIcon'

export const CtaGrid: React.FC<Type> = ({
  color,
  card,
  grid,
  spacer,
  content,
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
    <div
      className={`flex flex-col ${
        grid.size == 'container' ? 'container' : 'w-full'
      }
    ${
      grid.alignment == 'left'
        ? 'items-start'
        : 'center'
        ? 'items-center'
        : 'items-end'
    } ${mt} ${mb} justify-center lg:space-x-5 lg:items-start lg:flex-row `}
      style={{ backgroundColor: color ? color : '#fff' }}
    >
      <div className="mb-5 text-center lg:w-1/2 lg:mb-0">
        <div className="grid grid-cols-4">
          {card.map(({ color, border, icon, label }, key) => {
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
              <div
                key={key}
                style={{
                  backgroundColor: color ? color : '#fff',
                  borderColor: border.isLine ? border.stroke.color : '#fff',
                  borderWidth: border.isLine ? strokeSide.join(' ') : '0px',
                  borderRadius: border.isRound ? roundSide.join(' ') : '0px',
                }}
                className="w-auto col-span-2 px-5 py-8 m-1 text-center shadow-lg md:col-span-1 lg:col-span-2 lg:px-2 md:px-6 md:py-10"
              >
                <div className="inline-block p-5 rounded-full bg-secondary">
                  <FeatherIcon name={icon} />
                </div>
                <div className="text-headline-4 font-minimal">{label}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="lg:w-1/2">
        <h2
          className="mb-5 text-headline "
          style={{
            color: content?.title?.color ? content.title.color : '#000',
          }}
        >
          {content?.title?.text
            ? content.title.text
            : 'Every pieces is our hearts'}
        </h2>
        <p
          className="mb-4 text-2xl leading-none font-minimal"
          style={{
            color: content?.description?.color
              ? content.description.color
              : '#000',
          }}
        >
          {content?.description?.text
            ? content.description.text
            : 'Here is where love resides, memories are created, friends always belong, and laughter never ends. Believe it or not! Every single areas are being built by 99% natural raw materials. Most of it consist of green area, huge trees and ozone free. Surrounding by the warmest neighbour, by the middle of peace and close to the best lake in Pattaya. Come join us we are gathering place of kind-hearted people like you. We prefer the unbelievable offers for our customers. Because, we believe that more opportunity we gave became more grace to community.'}
        </p>
      </div>
    </div>
  )
}
