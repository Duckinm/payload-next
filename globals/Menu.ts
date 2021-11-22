import { GlobalConfig } from "payload/types"
import link, { Type as LinkType } from "../fields/link"

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
}

const Menu: GlobalConfig = {
  slug: "menu",
  label: "Menu",
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    description: "List of Navigation Header and Footer menu",
  },
  fields: [
    {
      name: "nav",
      label: "Header Menu",
      type: "array",
      labels: {
        singular: "Link",
        plural: "Links",
      },
      maxRows: 7,
      fields: [link],
    },
    {
      name: "column",
      type: "array",
      label: "Footer Menu",
      labels: {
        singular: "Column",
        plural: "Columns",
      },
      maxRows: 3,
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          admin: {
            placeholder: "Menu Title",
            autoComplete: "off",
          },
          localized: true,
        },
        {
          name: "nav",
          label: "Column",
          type: "array",
          maxRows: 8,
          labels: {
            singular: "Link",
            plural: "Links",
          },
          fields: [link],
        },
      ],
    },
  ],
}

export default Menu
