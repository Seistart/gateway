import { RDSDataClient } from "@aws-sdk/client-rds-data"
import { drizzle } from "drizzle-orm/aws-data-api/pg"
import { Resource } from "sst"

export const db = drizzle(new RDSDataClient({}), {
  database: Resource.SeistartDatabase.database,
  secretArn: Resource.SeistartDatabase.secretArn,
  resourceArn: Resource.SeistartDatabase.clusterArn,
})
