import { useState } from 'react'

type Props = {
  layout: any
  map?: string
  streetView?: string
}

const ButtonItems = ['Layout', 'Map', 'StreetView']

export const ButtonGroup: React.FC<Props> = ({ layout, map, streetView }) => {
  const [selected, setSelected] = useState('Layout')

  return (
    <div className="flex flex-col">
      <ul className="flex w-full mb-[18px] lg:w-3/4">
        {ButtonItems?.map((item, index) => {
          return (
            <li
              key={item}
              className={`button-group
              ${
                index === 0
                  ? 'first'
                  : index === ButtonItems.length - 1
                  ? 'end'
                  : ''
              } ${item === selected ? 'active' : ''}
              `}
              onClick={() => setSelected(item)}
            >
              {item}
            </li>
          )
        })}
      </ul>

      <div className="card-group">
        <img
          src={layout?.cloudStorageUrl}
          alt={layout?.alt}
          className={`card object-cover object-top ${
            selected === 'Layout' ? 'block' : 'hidden'
          }`}
          placeholder="blur"
        />
        <iframe
          src={map}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className={`card ${selected === 'Map' ? 'block' : 'hidden'}`}
        />
        <iframe
          src={streetView}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className={`card ${selected === 'StreetView' ? 'block' : 'hidden'}`}
        />
      </div>
    </div>
  )
}
