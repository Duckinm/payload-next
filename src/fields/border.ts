import { Field } from 'payload/types'
import color from '../components/ColorPicker/config'

export type Type = {
  isRound: boolean
  style: {
    roundSize: string
    roundSide: 'topleft' | 'topright' | 'bottomright' | 'bottomleft'
  }
  isLine: boolean
  stroke: {
    color: string
    strokeSize: string
    strokeSide: 'top' | 'right' | 'bottom' | 'left'
  }
}

const border: Field = {
  name: 'border',
  type: 'group',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      name: 'isRound',
      label: 'Enable Border',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'style',
      type: 'group',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.isRound) return true
          return false
        },
        hideGutter: true,
      },
      fields: [
        {
          name: 'roundSize',
          label: 'Round Size',
          type: 'text',
          defaultValue: '4px',
          required: true,
          admin: {
            placeholder: 'Example... 4px',
            width: '50%',
          },
        },
        {
          name: 'roundSide',
          label: 'Round Side',
          type: 'select',
          defaultValue: 'top',
          hasMany: true,
          required: true,
          options: [
            {
              label: 'Top Left',
              value: 'topleft',
            },
            {
              label: 'Top Right',
              value: 'topright',
            },
            {
              label: 'Bottom Right',
              value: 'bottomright',
            },
            {
              label: 'Bottom Left',
              value: 'bottomleft',
            },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'isLine',
      label: 'Enable Border Stroke',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'stroke',
      label: 'Stroke Outline',
      type: 'group',
      admin: {
        condition: (_, siblingData) => {
          if (siblingData.isLine) return true
          return false
        },
        hideGutter: true,
      },
      fields: [
        color,
        {
          name: 'strokeSize',
          label: 'Stroke Size',
          type: 'text',
          defaultValue: '1px',
          required: true,
          admin: {
            placeholder: 'Example... 2px',
            width: '50%',
          },
        },
        {
          name: 'strokeSide',
          label: 'Stroke Side',
          type: 'select',
          defaultValue: 'top',
          hasMany: true,
          required: true,
          options: [
            {
              label: 'Top',
              value: 'top',
            },
            {
              label: 'Right',
              value: 'right',
            },
            {
              label: 'Bottom',
              value: 'bottom',
            },
            {
              label: 'Left',
              value: 'left',
            },
          ],
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}

export default border
