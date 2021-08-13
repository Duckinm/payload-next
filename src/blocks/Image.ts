import { Block } from 'payload/types'
import { Type as MediaType } from '../collections/Media'
import grid, { Type as GridType } from '../fields/grid'
import spacer, { Type as SpacerType } from '../fields/spacer'

export type Type = {
  blockType: 'image'
  blockName?: string
  grid: GridType
  spacer: SpacerType
  image: MediaType
  type: 'normal' | 'wide' | 'fullscreen'
}

export const Image: Block = {
  slug: 'image',
  labels: {
    singular: 'Image',
    plural: 'Images',
  },
  fields: [
    grid,
    spacer,
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'type',
      label: 'Type',
      type: 'radio',
      defaultValue: 'normal',
      options: [
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Fullscreen',
          value: 'fullscreen',
        },
        {
          label: 'Wide',
          value: 'wide',
        },
      ],
      admin: {
        layout: 'horizontal',
      },
    },
  ],
}

export default Image
