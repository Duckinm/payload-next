const payload = require("payload")
const settings = require("./settings.json")

require("dotenv").config()

payload.init({
  secret: `${process.env.PAYLOAD_SECRET_KEY}`,
  mongoURL: `${process.env.MONGO_URL}`,
  local: true,
})

const createGlobals = async () => {
  await payload.updateGlobal({
    slug: "contacts",
    fallbackLocale: true,
    data: {},
  })

  await payload.updateGlobal({
    slug: "menu",
    fallbackLocale: true,
    data: {},
  })

  await payload.updateGlobal({
    slug: "settings",
    fallbackLocale: true,
    data: settings,
  })

  console.log("Seed completed!")
  process.exit(0)
}

createGlobals()
