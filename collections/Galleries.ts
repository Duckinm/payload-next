import { CollectionConfig } from "payload/types"
import CardInfo, { Type as CardInfoType } from "../blocks/CardInfo"
import { Type as MediaType } from "../collections/Media"
import meta, { Type as MetaType } from "../fields/meta"
import slug from "../fields/slug"

export type Layout = CardInfoType

type Highlight = {
  highlightCard: Layout[]
  layoutPlan: MediaType
  map: string
  streetView: string
}

export type Type = {
  title: string
  description?: string
  slider: MediaType[]
  sharesAlignment: "left" | "right"
  highlight: Highlight
  meta: MetaType
  slug: string
  components: Layout[]
}

export const Galleries: CollectionConfig = {
  slug: "galleries",
  admin: {
    useAsTitle: "title",
    preview: (doc: any, { locale }) => {
      const { slug } = doc

      if (process.env.NODE_ENV === "production" && slug) return `https://asianaresidence.com/gallery/${slug}?preview=true&locale=${locale}`

      return null ?? ""
    },
  },
  access: {
    read: (): boolean => true,
  },
  fields: [
    {
      name: "title",
      label: "Page Title",
      type: "text",
      required: true,
      unique: true,
      localized: true,
      admin: {
        placeholder: "Displayed on Gallery Page",
      },
    },
    {
      name: "description",
      label: "Page Description",
      type: "textarea",
      localized: true,
      admin: {
        placeholder: "Displayed on Gallery Page",
        rows: 4,
      },
    },
    {
      type: "array",
      name: "slider",
      labels: {
        singular: "Image Slider",
        plural: "Image Sliders",
      },
      minRows: 2,
      maxRows: 5,
      fields: [
        {
          type: "upload",
          name: "image",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "sharesAlignment",
      label: "Shares Alignment",
      type: "select",
      defaultValue: "right",
      required: true,
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
    {
      name: "highlight",
      label: "Features",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "layoutPlan",
              type: "upload",
              label: "Layout Plan",
              relationTo: "media",
              required: true,
              admin: {
                width: "100%",
              },
            },
            {
              name: "map",
              label: "Google Maps",
              type: "textarea",
              admin: {
                rows: 6,
                width: "50%",
                placeholder: "Paste only url link",
                description: "Find map here: https://www.google.com/maps",
              },
            },
            {
              name: "streetView",
              label: "Google StreetView",
              type: "textarea",
              admin: {
                rows: 6,
                width: "50%",
                placeholder: "Paste only url link",
                description: "Adjust layer to Satelite then zoom in to change view",
              },
            },
          ],
        },
        {
          name: "highlightCard",
          label: "Feature Box",
          type: "blocks",
          minRows: 1,
          maxRows: 1,
          blocks: [CardInfo],
        },
      ],
    },
    {
      name: "components",
      label: "Box",
      type: "blocks",
      minRows: 1,
      blocks: [CardInfo],
    },
    meta,
    slug,
  ],
}

export default Galleries
