import { Metadata } from 'next'

interface AppMetadata {
  home: Metadata
  projects: Metadata
  blogs: Metadata
  analytics: Metadata
}

export const appMetadata: AppMetadata = {
  home: {
    title: 'SeiStart: Home',
    description: '',
    keywords: [],
  },
  projects: {
    title: 'SeiStart: Projects',
    description: '',
    keywords: [],
  },
  blogs: {
    title: 'SeiStart: Blogs',
    description: '',
    keywords: [],
  },
  analytics: {
    title: 'SeiStart: Analytics',
    description: '',
    keywords: [],
  },
}
