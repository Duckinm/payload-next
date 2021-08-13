import dotenv from 'dotenv'
import cloudStorage from 'payload-plugin-cloud-storage'
import { buildConfig } from 'payload/config'
import FormSubmission from './src/collections/FormSubmission'
import Galleries from './src/collections/Galleries'
import Media from './src/collections/Media'
import Pages from './src/collections/Pages'
import Contacts from './src/globals/Contacts'
import Menu from './src/globals/Menu'
import Settings from './src/globals/Settings'
import { s3Adapter } from './src/lib/s3'

dotenv.config()

export default buildConfig({
  serverURL: 'https://asiana.herokuapp.com/',
  csrf: ['https://asiana.herokuapp.com/', 'https://asianaresidence.com'],
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
