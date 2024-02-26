import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://desired-dog-40713.upstash.io',
  token: process.env.REDIS_KEY!,
})
