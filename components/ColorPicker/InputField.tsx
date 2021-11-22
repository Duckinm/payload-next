import { Button } from "payload/components"
import { Label, useFieldType } from "payload/components/forms"
import { usePreferences } from "payload/components/preferences"
import { Validate } from "payload/dist/fields/config/types"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { colors } from "./colors"
import { validateHexColor } from "./config"
import "./styles.scss"

const baseClass = "custom-color-picker"
const preferenceKey = "color-picker-colors"

type Props = {
  path: string
  label: string
  required?: boolean
}

const InputField = ({ path, label, required }: Props) => {
  const { value = "", setValue } = useFieldType({
    path,
    validate: validateHexColor as Validate | undefined,
  })

  const { getPreference, setPreference } = usePreferences()
  const [colorOptions, setColorOptions] = useState(colors)
  const [isAdding, setIsAdding] = useState(false)
  const [colorToAdd, setColorToAdd] = useState("")

  useEffect(() => {
    const mergeColorsFromPreferences = async () => {
      const colorPreferences = await getPreference<string[]>(preferenceKey)
      if (colorPreferences) {
        setColorOptions(colorPreferences)
      }
    }
    mergeColorsFromPreferences()
  }, [getPreference, setColorOptions])

  const handleAddColor = useCallback(() => {
    setIsAdding(false)
    setValue(colorToAdd)

    // prevent adding duplicates
    if (colorOptions.indexOf(colorToAdd) > -1) return

    let newOptions = colorOptions
    newOptions.unshift(colorToAdd)

    // update state with new colors
    setColorOptions(newOptions)
    // store the user color preferences for future use
    setPreference(preferenceKey, newOptions)
  }, [colorOptions, setPreference, colorToAdd, setIsAdding, setValue])

  return (
    <div className={`${baseClass}`}>
      <Label htmlFor={path} label={label} required={required} />
      {isAdding && (
        <div>
          <input className={`${baseClass}__input`} type="text" placeholder="#000000" onChange={(e) => setColorToAdd(e.target.value)} value={colorToAdd} />
          <Button
            className={`${baseClass}__btn`}
            buttonStyle="primary"
            iconPosition="left"
            iconStyle="with-border"
            size="small"
            onClick={handleAddColor}
            disabled={validateHexColor(colorToAdd) !== true}
          >
            Add
          </Button>
          <Button className={`${baseClass}__btn`} buttonStyle="secondary" iconPosition="left" iconStyle="with-border" size="small" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </div>
      )}
      {!isAdding && (
        <Fragment>
          <ul className={`${baseClass}__colors`}>
            {colorOptions.map((color, i) => (
              <li key={i}>
                <button
                  type="button"
                  key={color}
                  className={`chip ${color === value ? "chip--selected" : ""} chip--clickable`}
                  style={{ backgroundColor: color }}
                  aria-label={color}
                  onClick={() => setValue(color)}
                />
              </li>
            ))}
            <Button
              className="add-color"
              icon="plus"
              buttonStyle="icon-label"
              iconPosition="left"
              iconStyle="with-border"
              onClick={() => {
                setIsAdding(true)
                setValue("")
              }}
            />
          </ul>
        </Fragment>
      )}
    </div>
  )
}
export default InputField
