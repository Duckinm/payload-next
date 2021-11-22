import { NextApiRequest, NextApiResponse } from "next"
import { SitemapStream, streamToPromise } from "sitemap"
const { Readable } = require("stream")

const staticData = ["/gallery", "/contacts"]

const Sitemap = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pageReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?locale=all`)

    const galleriesReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/galleries?locale=all`)

    const pageData = await pageReq.json()
    const galleriesData = await galleriesReq.json()

    //   const paths = dynamicSlugByLocale(pageData.docs, locales)

    let fields: {
      url: string
      changefreq: string
      priority: number
    }[] = []

    pageData.docs.map(({ slug }: { slug: string }) =>
      fields.push({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/${slug}`,
        changefreq: "daily",
        priority: 0.9,
      })
    )

    galleriesData.docs.map(({ slug }: { slug: string }) =>
      fields.push({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/gallery/${slug}`,
        changefreq: "daily",
        priority: 0.8,
      })
    )

    staticData.map((url) => {
      fields.push({
        url,
        changefreq: "daily",
        priority: 0.9,
      })
    })

    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    })

    res.writeHead(200, {
      "Content-Type": "application/xml",
    })

    const xmlString = await streamToPromise(Readable.from(fields).pipe(stream)).then((data) => data.toString())

    res.end(xmlString)
  } catch (e) {
    console.log(e)
    res.send(JSON.stringify(e))
  }
}

export default Sitemap
