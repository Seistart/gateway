export interface Project {
  projectName: string
  description: string
  imageUrl: string
  tags: ProjectTags[]
  startDate: string
  endDate: string
  seiVersion: number
  status: string
}

export enum ProjectStatus {
  Live = 'Live',
  SeekingFunding = 'Seeking Funding',
  InDevelopment = 'In Development',
}

export enum ProjectTags {
  AI = 'AI',
  ActiveISPO = 'Active ISPO',
  Community = 'Community',
  DataServices = 'Data / Services',
  DeFi = 'DeFi',
  DeveloperTools = 'Developer Tools',
  Education = 'Education',
  ExchangesDEX = 'Exchanges (DEX)',
  Gambling = 'Gambling',
  Gaming = 'Gaming',
  Governance = 'Governance',
  Identity = 'Identity',
  Infrastructure = 'Infrastructure',
  Insurance = 'Insurance',
  Launchpad = 'Launchpad',
  LendingBorrowing = 'Lending & Borrowing',
  Marketplaces = 'Marketplaces',
  MemeCoins = 'Meme Coins',
  Metaverse = 'Metaverse',
  NFT = 'NFT',
  NFTMarketplace = 'NFT Marketplace',
  NFTTools = 'NFT Tools',
  Payment = 'Payment',
  Social = 'Social',
  Stablecoin = 'Stablecoin',
  ToolsExplorers = 'Tools & Explorers',
  Wallets = 'Wallets',
}
