import { Block } from 'payload/types'
import * as icons from 'react-feather'
import color from '../components/ColorPicker/config'
import border, { Type as BorderType } from '../fields/border'
import grid, { Type as GridType } from '../fields/grid'
import icon from '../fields/icon'
import spacer, { Type as SpacerType } from '../fields/spacer'

type IconType = keyof typeof icons

export type Type = {
  blockType: 'ctaGrid'
  blockName?: string
  color?: string
  grid: GridType
  spacer: SpacerType
  card: {
    color?: string
    border: BorderType
    label: string
    icon: IconType
  }[]
  content: {
    title?: {
      text?: string
      color?: string
    }
    description?: {
      text?: string
      color?: string
    }
  }
}

export const CtaGrid: Block = {
  slug: 'ctaGrid',
  labels: {
    singular: 'Call To Action',
    plural: 'Call To Action',
  },
  fields: [
    color,
    grid,
    spacer,
    {
      name: 'card',
      type: 'array',
      labels: {
        singular: 'CTA Card',
        plural: 'CTA Cards',
      },
      minRows: 4,
      maxRows: 4,
      fields: [
        color,
        border,
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              localized: true,
              required: true,
              admin: {
                width: '50%',
              },
            },
            icon,
          ],
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              localized: true,
              admin: {
                placeholder: 'CTA Title...',
              },
            },
            color,
          ],
          admin: {
            hideGutter: true,
          },
        },
        {
          name: 'description',
          label: 'Description',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              localized: true,
              admin: {
                placeholder: 'CTA Description...',
                rows: 5,
              },
            },
            color,
          ],
          admin: {
            hideGutter: true,
          },
        },
      ],
    },
  ],
}

export default CtaGrid
