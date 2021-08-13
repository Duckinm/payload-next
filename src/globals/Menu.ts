import { GlobalConfig } from 'payload/types'
import link, { Type as LinkType } from '../fields/link'

export type Type = {
  nav: {
    link: LinkType
  }[]
  column: {
    title: string
    nav: {
      link: LinkType
    }[]
  }[]
  title: string
  desc: string
  brand: string
}

const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menu',
  access: {
    read: () => true,
  },
  admin: {
    description: 'List of Navigation Header and Footer menu',
  },
  fields: [
    {
      name: 'brand',
      label: 'Company Name',
      type: 'text',
      admin: {
        placeholder: 'Your brand identity or just name',
      },
      localized: true,
    },

    {
      name: 'nav',
      label: 'Header Menu',
      type: 'array',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      minRows: 1,
      maxRows: 7,
      fields: [link],
    },
    {
      name: 'column',
      type: 'array',
      label: 'Footer Menu',
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          admin: {
            placeholder: 'Menu Title',
            autoComplete: 'off',
          },
          localized: true,
        },
        {
          name: 'nav',
          label: 'Column',
          type: 'array',
          maxRows: 8,
          labels: {
            singular: 'Link',
            plural: 'Links',
          },
          fields: [link],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Footer Contact Title',
          type: 'text',
          defaultValue: 'Contacts',
          required: true,
          localized: true,

          admin: {
            width: '100%',
            placeholder: 'Default Menu Title',
          },
        },
        {
          name: 'desc',
          label: 'Footer Contact Description',
          type: 'textarea',
          defaultValue:
            'Feel free to get in touch with us via phone or send us a message',
          required: true,
          localized: true,

          admin: {
            width: '100%',
            rows: 4,
          },
        },
      ],
    },
  ],
}

export default Menu
