import { Block } from 'payload/types'
import { Type as GalleriesType } from '../collections/Galleries'
import { Type as MediaType } from '../collections/Media'
import color from '../components/ColorPicker/config'
import spacer, { Type as SpacerType } from '../fields/spacer'

export type Type = {
  blockType: 'features'
  blockName?: string
  color?: string
  title: {
    text: string
    color?: string
  }
  section: {
    spacer: SpacerType
    starred: {
      value: GalleriesType
    }
    alignment: 'left' | 'right'
    slider: {
      image: MediaType
    }[]
    buttonColor: {
      color?: string
    }
  }[]
}

export const Features: Block = {
  slug: 'features',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  fields: [
    color,
    {
      name: 'title',
      type: 'group',
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          localized: true,
        },
        color,
      ],
    },
    {
      name: 'section',
      type: 'array',
      labels: {
        singular: 'Feature Section',
        plural: 'Features Section',
      },
      fields: [
        spacer,
        {
          name: 'starred',
          label: 'Starred Features',
          type: 'relationship',
          relationTo: ['galleries'],
          required: true,
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
              label: 'Right',
              value: 'right',
            },
          ],
        },
        {
          name: 'slider',
          label: 'Slider Images',
          labels: {
            singular: 'Slider',
            plural: 'Sliders',
          },
          type: 'array',
          minRows: 3,
          maxRows: 9,
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
        {
          name: 'buttonColor',
          type: 'group',
          label: 'Button Color',
          fields: [color],
          admin: {
            hideGutter: true,
          },
        },
      ],
    },
  ],
}

export default Features
