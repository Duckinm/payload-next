import { Block } from 'payload/types'
import { Type as MediaType } from '../collections/Media'
import color from '../components/ColorPicker/config'
import grid, { Type as GridType } from '../fields/grid'
import spacer, { Type as SpacerType } from '../fields/spacer'

export type Type = {
  blockType: 'sponsor'
  blockName?: string
  color: string
  grid: GridType
  spacer: SpacerType
  imageGallery: {
    image: MediaType
  }[]
  content: {
    title: {
      text: string
      color?: string
    }
    description: {
      text: string
      color?: string
    }
  }
}

export const Sponsor: Block = {
  slug: 'sponsor',
  labels: {
    singular: 'Sponsor',
    plural: 'Sponsors',
  },
  fields: [
    color,
    grid,
    spacer,
    {
      name: 'imageGallery',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Thankful header...',
              },
            },
            color,
          ],
        },
        {
          name: 'description',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                rows: 5,
                placeholder: 'Thankful replies to our sponsors...',
              },
            },
            color,
          ],
        },
      ],
    },
  ],
}

export default Sponsor
