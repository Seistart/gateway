import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront"

const cloudFront = new CloudFrontClient({})

export const invalidateCloudFrontPaths = async (paths: string[]) => {
  await cloudFront.send(
    new CreateInvalidationCommand({
      // Set CloudFront distribution ID here
      DistributionId: "E2UEIZ39CY8D9Y",
      InvalidationBatch: {
        CallerReference: `${Date.now()}`,
        Paths: {
          Quantity: paths.length,
          Items: paths,
        },
      },
    })
  )
}
