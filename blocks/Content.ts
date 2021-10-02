import { Block } from 'payload/types'
import color from '../components/ColorPicker/config'
import grid, { Type as GridType } from '../fields/grid'
import spacer, { Type as SpacerType } from '../fields/spacer'

export type Type = {
  blockType: 'content'
  blockName?: string
  container: {
    color: string
    grid: GridType
  }
  content: {
    title: {
      color?: string
      text: string
    }
    description: {
      color?: string
      text: string
    }
  }
  spacer: SpacerType
}

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Content',
    plural: 'Content Blocks',
  },
  fields: [
    {
      name: 'container',
      label: 'Container',
      type: 'group',
      fields: [color, grid],
      admin: {
        hideGutter: true,
      },
    },
    {
      name: 'content',
      label: 'Content Area',
      type: 'group',
      admin: {
        hideGutter: true,
      },
      fields: [
        {
          name: 'title',
          type: 'group',
          label: 'Title',
          fields: [
            color,
            {
              name: 'text',
              label: 'Header',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Your Header...',
              },
            },
          ],
          admin: {
            hideGutter: true,
          },
        },
        {
          name: 'description',
          label: 'Description Text',
          type: 'group',
          fields: [
            color,
            {
              name: 'text',
              label: 'Description',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                placeholder: 'Paragraph support header',
                rows: 4,
              },
            },
          ],
          admin: {
            hideGutter: true,
          },
        },
      ],
    },

    spacer,
  ],
}

export default Content
