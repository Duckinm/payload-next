import * as icons from 'react-feather'

type IconName = keyof typeof icons

type IconProps = {
  name: IconName
  className?: string
}

export default function FeatherIcon({ name, ...rest }: IconProps) {
  const IconComponent = icons[name]

  return <IconComponent {...rest} />
}
