import { Field } from 'payload/types'

export type List = {
  topic: string
  menu: {
    label: string
    description: string
  }[]
}

export type Type = {
  list: List[]
}

export type MainType = {
  list: List
}

export const list: Field = {
  name: 'list',
  labels: {
    singular: 'List',
    plural: 'Lists',
  },
  type: 'array',
  fields: [
    {
      name: 'topic',
      label: 'Topic',
      type: 'text',
      localized: true,
      required: true,
      admin: {
        placeholder: 'Topic...',
      },
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
                rows: 2,
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

export const mainList: Field = {
  name: 'mainList',
  type: 'group',
  fields: [
    {
      name: 'topic',
      label: 'Topic',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Highlight Information',
      admin: {
        placeholder: 'Topic...',
      },
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
                rows: 2,
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
