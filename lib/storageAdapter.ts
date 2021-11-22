import { S3Adapter } from "payload-plugin-cloud-storage"

export const spacesAdapter = new S3Adapter(
  {
    endpoint: `https://${process.env.SPACES_REGION}.digitaloceanspaces.com`,
    region: process.env.SPACES_REGION,
    credentials: {
      accessKeyId: process.env.SPACES_KEY ?? "",
      secretAccessKey: process.env.SPACES_SECRET ?? "",
    },
  },
  {
    bucket: process.env.SPACES_NAME ?? "",
    endpointUrl: `https://${process.env.SPACES_NAME}.${process.env.SPACES_REGION}.cdn.digitaloceanspaces.com`,
  }
)

export const s3Adapter = new S3Adapter(
  {
    endpoint: `https://s3.${process.env.S3_REGION}.amazonaws.com`,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_KEY ?? "",
      secretAccessKey: process.env.S3_SECRET ?? "",
    },
  },
  {
    bucket: process.env.S3_NAME ?? "",
    endpointUrl: `https://${process.env.S3_NAME}.s3.${process.env.S3_REGION}.amazonaws.com`,
  }
)
