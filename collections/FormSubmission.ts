import { CollectionConfig } from 'payload/types'

type Type = {
  mail: string
  tel: string
  message: unknown
  source?: string
}

const FormSubmission: CollectionConfig = {
  slug: 'form-submissions',
  fields: [
    {
      type: 'text',
      name: 'mail',
      label: 'Email',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'tel',
      label: 'Tel',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'source',
      label: 'Source',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}

export default FormSubmission
