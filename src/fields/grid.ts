import { Field } from 'payload/types'

export type Type = {
  size: 'container' | 'full'
  alignment: 'left' | 'center' | 'right'
}

const grid: Field = {
  name: 'grid',
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'size',
          label: 'Container',
          type: 'select',
          defaultValue: 'full',
          required: true,
          options: [
            {
              label: 'Container',
              value: 'container',
            },
            {
              label: 'Full Container',
              value: 'full',
            },
          ],
          admin: {
            width: '50%',
          },
        },
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
    },
  ],
}

export default grid
