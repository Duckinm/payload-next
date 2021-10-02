import { Field } from 'payload/types'

export type Type = {
  title?: string
  description?: string
  keywords?: string
}

const meta: Field = {
  name: 'meta',
  label: 'Meta',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      admin: {
        // placeholder: 'Title that is unique, but powerful at the same time.',
        description: ({ value }) =>
          `${
            typeof value === 'string' ? 60 - value.length : '60'
          } characters left`,
      },
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        // placeholder: 'Overview in brief',
        description: ({ value }) =>
          `${
            typeof value === 'string' ? 160 - value.length : '160'
          } characters left`,
      },
    },
    {
      name: 'keywords',
      label: 'Keywords',
      type: 'text',
      admin: {
        // placeholder: 'In term of words, What is it?',
        description: 'Only relates and important keyword',
      },
    },
  ],
  admin: {
    position: 'sidebar',
    hideGutter: true,
  },
}

export default meta
