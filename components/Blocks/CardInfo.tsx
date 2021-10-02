import { Type } from 'blocks/CardInfo'

export const CardInfo: React.FC<Type> = ({ topic, options, menu }) => {
  return (
    <div className="flex flex-col mb-16">
      <h1 className="mb-3 text-primary text-paragraph-2">
        {topic ? topic : 'Highlight Information'}
      </h1>
      {menu.map(({ label, description }, key) => (
        <div
          key={key}
          className={`${
            options?.color !== '#fff' || undefined ? 'px-5' : ''
          } flex flex-col space-y-4 py-6`}
          style={{ backgroundColor: options?.color ? options.color : '#fff' }}
        >
          <div
            className={`${
              options?.accentLine ? 'border-b-2 border-tertiary-variants' : ''
            } flex justify-between pb-1 space-x-20`}
          >
            <div className="text-tertiary">{label ? label : 'Location'}</div>
            <div className="ml-auto text-right text-tertiary">
              {description
                ? description
                : '44/80 Bangna Bangsai Thailand 12120'}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
