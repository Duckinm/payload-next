import { GlobalConfig } from "payload/types"
import { Type as MediaType } from "../collections/Media"

export type Shares = {
  facebook: boolean
  messenger: boolean
  twitter: boolean
  line: boolean
  linkedin: boolean
  mail: boolean
}

export type Type = {
  brand: string
  icon: {
    logo?: MediaType
    favicon?: MediaType
  }
  googleMap: string
  contactInfo: {
    title?: string
    desc?: string
  }
  tag: {
    googleAnalytics: string
    googleTagManager: string
  }
  shares: Shares
  disclaimers: {
    title: string
    desc: string
  }
}

const Settings: GlobalConfig = {
  slug: "settings",
  label: "Settings",
  access: {
    read: () => true,
    update: () => true,
  },
  admin: {
    description: "Setting, config, tag and all available tools",
  },
  fields: [
    {
      name: "brand",
      label: "Company Name",
      type: "text",
      admin: {
        placeholder: "Your brand identity or just name",
      },
      localized: true,
    },

    {
      name: "icon",
      type: "group",
      fields: [
        {
          name: "logo",
          label: "Logo Icon",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "favicon",
          label: "Fav Icon",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "googleMap",
      label: "Google Map",
      type: "textarea",
      admin: {
        placeholder: "Find your location on Google Maps, then get url from embbed map (Share button)",
        description: "Url only! What is Url? https://en.wikipedia.org/wiki/URL",
        rows: 4,
      },
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        { name: "title", type: "text", localized: true },
        { name: "desc", type: "textarea", localized: true, admin: { rows: 5 } },
      ],
      admin: {
        hideGutter: true,
      },
    },
    {
      name: "shares",
      label: "Shares Channel",
      type: "group",
      admin: {
        description: "Send your content via those channels",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "facebook",
              type: "checkbox",
              label: "Facebook",
              defaultValue: true,
            },
            {
              name: "messenger",
              type: "checkbox",
              label: "Messenger",
              defaultValue: false,
              admin: {
                disabled: true,
              },
            },
            {
              name: "line",
              type: "checkbox",
              label: "Line",
              defaultValue: true,
            },
            {
              name: "twitter",
              type: "checkbox",
              label: "Twitter",
              defaultValue: true,
            },
            {
              name: "linkedin",
              type: "checkbox",
              label: "Linkedin",
              defaultValue: false,
            },
            {
              name: "mail",
              type: "checkbox",
              label: "Mail",
              defaultValue: true,
            },
          ],
        },
      ],
    },
    {
      name: "tag",
      label: "Tags",
      type: "group",
      admin: {
        description: "How to install?: https://www.youtube.com/watch?v=WFuwVKeUglU",
      },
      fields: [
        {
          name: "googleAnalytics",
          label: "Google Analytics",
          type: "text",
          admin: {
            placeholder: "Paste GA-ID...",
          },
        },
        {
          name: "googleTagManager",
          label: "Google Tag Manager",
          type: "text",
          admin: {
            placeholder: "Paste GTM-ID...",
          },
        },
        {
          name: "googleSearchConsole",
          label: "Google Search Console",
          type: "text",
          admin: {
            readOnly: true,
            placeholder: "This can be achieved by adding GTM or GA",
          },
        },
      ],
    },
    {
      name: "disclaimers",
      type: "group",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          defaultValue: "Contacts",
          required: true,
          localized: true,
          admin: {
            width: "100%",
          },
        },
        {
          name: "desc",
          label: "Description",
          type: "textarea",
          defaultValue: "Feel free to get in touch with us via phone or send us a message",
          required: true,
          localized: true,
          admin: {
            width: "100%",
            rows: 4,
          },
        },
      ],
    },
  ],
}

export default Settings
