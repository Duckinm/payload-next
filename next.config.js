const path = require('path')

require('dotenv').config()

module.exports = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  },
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'en',
  },
}
