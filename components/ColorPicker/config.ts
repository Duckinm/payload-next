import { Validate } from "payload/dist/fields/config/types"
import { Field } from "payload/types"
import { ComponentType } from "react"
import Cell from "./Cell"
import InputField from "./InputField"

export const validateHexColor = (value: string | boolean): boolean | boolean | string  => {
  if (!value) return value == "#fff"

  return typeof value === "string" ? value.match(/^#(?:[0-9a-fA-F]{3}){1,2}$/)!.length === 1 : "" || `${value} is not a valid hex color`
}

const color: Field = {
  name: "color",
  type: "text",
  validate: validateHexColor as Validate | undefined,
  admin: {
    components: {
      Field: InputField as ComponentType<{}> | undefined,
      Cell,
    },
  },
}

export default color
