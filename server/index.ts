import express from 'express'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import payload from 'payload'
import '../src/lib/env'

const dev = process.env.NODE_ENV !== 'production'
const server = express()
const request = require('request')
const fixieRequest = request.defaults({ proxy: process.env.FIXIE_URL })

fixieRequest('http://www.example.com', (err, res, body) => {
  console.log(`Got response: ${res.statusCode}`)
})

payload.init({
  license: `${process.env.PAYLOAD_LICENSE}`,
  secret: `${process.env.PAYLOAD_SECRET_KEY}`,
  mongoURL: `${process.env.MONGO_URL}`,
  express: server,
})

if (!process.env.NEXT_BUILD) {
  const nextApp = next({ dev })
  const nextHandler = nextApp.getRequestHandler()

  server.get('*', (req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    server.listen(process.env.PORT || 3000, async () => {
      console.log(`Server listening on ${process.env.PORT}...`)
    })
  })
} else {
  server.listen(process.env.PORT || 3000, async () => {
    await nextBuild(path.join(__dirname, '../'))
    process.exit()
  })
}
