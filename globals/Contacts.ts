import { GlobalConfig } from 'payload/types'

export type Type = {
  telList: {
    tel: string
  }[]
  emailList: {
    email: string
  }[]
  facebook: string
  instagram: string
  line: string
  twitter: string
  youtube: string
}

const Contacts: GlobalConfig = {
  slug: 'contacts',
  label: 'Social Media',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Connects all your social media',
  },
  fields: [
    {
      name: 'telList',
      label: 'Telephone',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'tel',
          type: 'text',
          admin: {
            placeholder: 'Tel No.',
          },
        },
      ],
    },
    {
      name: 'emailList',
      label: 'Email',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'email',
          type: 'text',
          admin: {
            placeholder: 'Email',
          },
        },
      ],
    },
    {
      name: 'facebook',
      label: 'Facebook',
      type: 'text',
      admin: {
        placeholder: 'Facebook Url',
      },
    },
    {
      name: 'instagram',
      label: 'Instagram',
      type: 'text',
      admin: {
        placeholder: 'Instagram Url',
      },
    },
    {
      name: 'line',
      label: 'LINE',
      type: 'text',
      admin: {
        placeholder: 'LINE Url',
      },
    },
    {
      name: 'twitter',
      label: 'Twitter',
      type: 'text',
      admin: {
        placeholder: 'Twitter Url',
      },
    },
    {
      name: 'youtube',
      label: 'Youtube',
      type: 'text',
      admin: {
        placeholder: 'Youtube Url',
      },
    },
  ],
}

export default Contacts
