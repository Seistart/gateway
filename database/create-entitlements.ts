import {
  Permission,
  Role,
} from "@/server-actions/entitlements/entitlements.models"
import { db } from "./database"
import {
  PermissionTable,
  RolePermissionTable,
  RoleTable,
} from "./schemas/roles.schema"

async function createInitialEntitlements() {
  const permisions = Object.values(Permission)

  const initPermissions = permisions.map((permission) => ({
    name: permission,
  }))

  const initRoles = [
    { name: Role.Admin },
    { name: Role.Moderator },
    { name: Role.User },
  ]

  const moderatorPermissions = [
    Permission.ProjectSelfWrite,
    Permission.ProjectSelfEdit,
    Permission.ProjectSelfDelete,
    Permission.ProjectSelfRead,
    Permission.TagAllRead,
    Permission.ProjectAllRead,
  ]

  const userPermissions = [Permission.TagAllRead, Permission.ProjectAllRead]

  const insertedPermissions = await db
    .insert(PermissionTable)
    .values(initPermissions)
    .returning()

  const insertedRoles = await db.insert(RoleTable).values(initRoles).returning()

  const permissionMap = insertedPermissions.reduce(
    (acc: { [key: string]: number }, permission) => {
      acc[permission.name] = permission.id
      return acc
    },
    {}
  )

  const rolePermissionsMap = {
    [Role.Admin]: initPermissions.map((p) => permissionMap[p.name]),
    [Role.Moderator]: moderatorPermissions.map((name) => permissionMap[name]),
    [Role.User]: userPermissions.map((name) => permissionMap[name]),
  } as { [key: string]: number[] }

  for (const role of insertedRoles) {
    const rolePermissions = rolePermissionsMap[role.name]
    if (rolePermissions) {
      for (const permissionId of rolePermissions) {
        console.log({
          roleId: role.id,
          permissionId: permissionId,
        })
        await db.insert(RolePermissionTable).values({
          roleId: role.id,
          permissionId: permissionId,
        })
      }
    }
  }
}

const initEntitlements = async () => {
  console.error("Creating Entitlements")
  await createInitialEntitlements()
  console.error("Succesfully Created Entitlements")
  process.exit(0)
}

initEntitlements().catch((err) => {
  console.error("Failed Creating Entitlements")
  console.error(err)
  process.exit(1)
})
