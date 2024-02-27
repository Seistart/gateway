import { Analytics } from '@/components/pages'
import { appMetadata } from '@/configs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  ...appMetadata.analytics,
}

export default function AnalyticsPage() {
  return <Analytics />
}
