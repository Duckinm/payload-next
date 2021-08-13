import { Block } from 'payload/types'
import { Type as GalleriesType } from '../collections/Galleries'
import { Type as MediaType } from '../collections/Media'
import color from '../components/ColorPicker/config'
import border, { Type as BorderType } from '../fields/border'

export type Colors = {
  color?: string
}

export type Type = {
  blockType: 'hero'
  blockName?: string
  heroImage: MediaType
  card: {
    starred: {
      value: GalleriesType
    }
    backgroundColor: Colors
    border: BorderType
    titleColor?: Colors
    descColor?: Colors
  }[]
}

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    {
      name: 'heroImage',
      label: 'Hero Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'card',
      type: 'array',
      labels: {
        singular: 'Hero Card',
        plural: 'Hero Cards',
      },
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'starred',
          label: 'Starred Features',
          type: 'relationship',
          relationTo: ['galleries'],
          required: true,
        },
        {
          name: 'backgroundColor',
          label: 'Background Color',
          type: 'group',
          fields: [color],
          admin: {
            hideGutter: true,
          },
        },
        border,
        {
          type: 'row',
          fields: [
            {
              name: 'titleColor',
              label: 'Title Color',
              type: 'group',
              fields: [color],
              admin: {
                hideGutter: true,
                width: '100%',
              },
            },
            {
              name: 'descColor',
              label: 'Description Color',
              type: 'group',
              fields: [color],
              admin: {
                hideGutter: true,
                width: '100%',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Hero
