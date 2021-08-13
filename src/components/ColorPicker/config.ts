import { Field } from 'payload/types'
import Cell from './Cell'
import InputField from './InputField'

export const validateHexColor = (value: string): any => {
  // REMARK Setter before calling Block Components
  if (!value) return value == '#fff'

  return (
    value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)!.length === 1 ||
    `${value} is not a valid hex color`
  )
}

const color: Field = {
  name: 'color',
  type: 'text',
  validate: validateHexColor,
  admin: {
    components: {
      Field: InputField,
      Cell,
    },
  },
}

export default color
