export interface Entitlements {
  role: string
  permissions: {
    [key in Permission]: boolean
  }
}

export enum Role {
  Admin = "Admin",
  Moderator = "Moderator",
  User = "User",
}

export enum Permission {
  ProjectSelfRead = "Project:Self:Read",
  ProjectSelfWrite = "Project:Self:Write",
  ProjectSelfEdit = "Project:Self:Edit",
  ProjectSelfDelete = "Project:Self:Delete",
  ProjectAllRead = "Project:All:Read",
  ProjectAllWrite = "Project:All:Write",
  ProjectAllEdit = "Project:All:Edit",
  ProjectAllDelete = "Project:All:Delete",
  TagAllRead = "Tag:All:Read",
  TagAllWrite = "Tag:All:Write",
  TagAllEdit = "Tag:All:Edit",
  TagAllDelete = "Tag:All:Delete",
  AnalyticsAllRead = "Analytics:All:Read",
  EntitlementsAllRead = "Entitlements:All:Read",
  EntitlementsAllWrite = "Entitlements:All:Write",
  EntitlementsAllEdit = "Entitlements:All:Edit",
  EntitlementsAllDelete = "Entitlements:All:Delete",
}
