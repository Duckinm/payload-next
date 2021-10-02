import { SitemapStream, streamToPromise } from 'sitemap'
const { Readable } = require('stream')

const Sitemap = async (req, res) => {
  try {
    const PagesReq = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all`
    )

    const GalleriesReq = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=all`
    )

    const PagesData = await PagesReq.json()
    const GalleriesData = await GalleriesReq.json()

    const staticData = ['/gallery', '/contacts']

    let fields: any[] = []

    PagesData.docs.map(({ slug }) =>
      fields.push({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}`,
        changefreq: 'daily',
        priority: 0.9,
      })
    )

    GalleriesData.docs.map(({ slug }) =>
      fields.push({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/gallery/${slug}`,
        changefreq: 'daily',
        priority: 0.8,
      })
    )

    staticData.map((url) => {
      fields.push({
        url,
        changefreq: 'daily',
        priority: 0.9,
      })
    })

    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    })

    res.writeHead(200, {
      'Content-Type': 'application/xml',
    })

    const xmlString = await streamToPromise(
      Readable.from(fields).pipe(stream)
    ).then((data) => data.toString())

    res.end(xmlString)
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}

export default Sitemap
