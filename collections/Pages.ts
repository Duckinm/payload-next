import { CollectionConfig } from "payload/types"
import Content, { Type as ContentType } from "../blocks/Content"
import CtaGrid, { Type as CtaGridType } from "../blocks/CtaGrid"
import Features, { Type as FeaturesType } from "../blocks/Features"
import Hero, { Type as HeroType } from "../blocks/Hero"
import Image, { Type as ImageType } from "../blocks/Image"
import Sponsor, { Type as SponsorType } from "../blocks/Sponsor"
import meta, { Type as MetaType } from "../fields/meta"
import slug from "../fields/slug"

export type Layout = HeroType | ContentType | FeaturesType | SponsorType | ImageType | CtaGridType

export type Type = {
  title: string
  desc: string
  layout: Layout[]
  meta: MetaType
  slug: string
}

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    preview: (doc, { locale }) => {
      const { slug } = doc
      if (process.env.NODE_ENV === "production" && slug) return `https://asianaresidence.com/${slug}?preview=true&locale=${locale}`

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
        placeholder: "Header",
      },
    },
    {
      name: "desc",
      label: "Page Description",
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        placeholder: "Displayed on Gallery page and use as meta desc.",
        rows: 5,
      },
    },
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks: [Hero, Image, Features, Sponsor, CtaGrid, Content],
    },
    slug,
    meta,
  ],
}

export default Pages
