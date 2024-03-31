/// <reference path="./.sst/platform/config.d.ts" />
import { env } from "./env.mjs"
export default $config({
  app(input) {
    return {
      name: "gateway",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    }
  },
  async run() {
    const database = new sst.aws.Postgres("SeistartDatabase", {
      version: "16.1",
      databaseName: "seistart",
      scaling: {
        min: "0.5 ACU",
        max: "1 ACU",
      },
    })
    new sst.aws.Nextjs(
      "SeistartWebApp",
      {
        link: [database],
        openNextVersion: "3.0.0-rc.11",
        warm: 20,
        environment: env,
      },
      {
        version: "20",
      }
    )
  },
})
