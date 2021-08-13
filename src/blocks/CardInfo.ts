import { Block } from 'payload/types'
import color from '../components/ColorPicker/config'

export type Type = {
  blockType: 'cardInfo'
  topic: string
  options?: {
    color: string
    accentLine: boolean
  }
  menu: {
    label: string
    description?: string
  }[]
}

export const CardInfo: Block = {
  slug: 'cardInfo',
  labels: {
    singular: 'Card Info',
    plural: 'Cards Info',
  },
  fields: [
    {
      name: 'topic',
      label: false,
      type: 'text',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Topic...',
      },
    },
    {
      name: 'options',
      type: 'group',
      label: false,
      fields: [
        color,
        {
          name: 'accentLine',
          type: 'checkbox',
          label: 'Underline',
          defaultValue: true,
          admin: {
            width: '20%',
          },
        },
      ],
    },
    {
      name: 'menu',
      label: 'Menu',
      type: 'array',
      labels: {
        singular: 'List',
        plural: 'Lists',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              localized: true,
              admin: {
                placeholder: 'Label...',
                width: '100%',
              },
            },
            {
              name: 'description',
              label: 'Description',
              type: 'textarea',
              localized: true,
              admin: {
                rows: 3,
                placeholder: 'Details...',
                width: '100%',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default CardInfo
