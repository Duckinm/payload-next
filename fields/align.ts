import { Field } from 'payload/types'

export type Type = {
  alignment: 'left' | 'center' | 'right'
}

const align: Field = {
  name: 'align',
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'select',
      defaultValue: 'left',
      required: true,
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
      admin: {
        width: '50%',
      },
    },
  ],
}

export default align
