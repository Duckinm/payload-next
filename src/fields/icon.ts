import { Field } from 'payload/types'
import * as icons from 'react-feather'

type IconName = keyof typeof icons

export type Type = {
  icon: IconName
}

const icon: Field = {
  name: 'icon',
  type: 'select',
  required: true,
  options: [
    {
      label: 'Home',
      value: 'Home',
    },
    {
      label: 'Package',
      value: 'Package',
    },
    {
      label: 'Wind',
      value: 'Wind',
    },
    {
      label: 'Gift',
      value: 'Gift',
    },
  ],
}

export default icon
