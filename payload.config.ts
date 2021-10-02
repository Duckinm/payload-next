import dotenv from 'dotenv'
import cloudStorage from 'payload-plugin-cloud-storage'
import { buildConfig } from 'payload/config'
import FormSubmission from './collections/FormSubmission'
import Galleries from './collections/Galleries'
import Media from './collections/Media'
import Pages from './collections/Pages'
import Contacts from './globals/Contacts'
import Menu from './globals/Menu'
import Settings from './globals/Settings'
import { s3Adapter } from './lib/s3'

dotenv.config()

export default buildConfig({
  serverURL: `${process.env.PAYLOAD_PUBLIC_SERVER_URL}`,
  collections: [Galleries, Pages, FormSubmission, Media],
  globals: [Menu, Contacts, Settings],
  localization: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    fallback: true,
  },
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
  plugins: [cloudStorage(s3Adapter)],
})
