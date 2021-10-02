import { Field } from 'payload/types'
import { Type as GalleriesType } from '../collections/Galleries'
import { Type as PageType } from '../collections/Pages'

export type Type = {
  type: 'page' | 'custom'
  label: string
  page?: {
    value: PageType & GalleriesType
  }
  url?: string
  checkbox?: boolean
}

const link: Field = {
  name: 'link',
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          label: 'Page',
          value: 'page',
        },
        {
          label: 'Custom URL',
          value: 'custom',
        },
      ],
      defaultValue: 'page',
      admin: {
        layout: 'horizontal',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'page',
          label: 'Page to link to',
          type: 'relationship',
          relationTo: ['pages', 'galleries'],
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'page',
            width: '50%',
          },
        },
        {
          name: 'url',
          label: 'Custom URL',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'checkbox',
      type: 'checkbox',
      label: 'Open in a new tab',
      defaultValue: false,
    },
  ],
}

export default link
