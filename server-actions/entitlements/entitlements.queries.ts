import { db } from "@/database/database"
import {
  PermissionTable,
  RolePermissionTable,
  RoleTable,
  UserRoleTable,
} from "@/database/schemas/roles.schema"
import { UserTable } from "@/database/schemas/users.schema"
import { eq } from "drizzle-orm"
import { Permission, Role } from "./entitlements.models"

export const getUserEntitlements = async (userId: string) => {
  const roleResult = (await db
    .select({
      roleName: RoleTable.name,
      permissionName: PermissionTable.name,
    })
    .from(UserTable)
    .leftJoin(UserRoleTable, eq(UserTable.id, UserRoleTable.userId))
    .leftJoin(RoleTable, eq(UserRoleTable.roleId, RoleTable.id))
    .leftJoin(RolePermissionTable, eq(RoleTable.id, RolePermissionTable.roleId))
    .leftJoin(
      PermissionTable,
      eq(RolePermissionTable.permissionId, PermissionTable.id)
    )
    .where(eq(UserTable.id, userId))) as {
    roleName: Role
    permissionName: Permission
  }[]

  let role = ""
  const permissions = {} as { [key in Permission]: boolean }

  roleResult.forEach((result) => {
    if (!role && result.roleName) {
      role = result.roleName
    }
    if (result.permissionName) {
      permissions[result.permissionName] = true
    }
  })

  const entitlements = {
    role,
    permissions,
  }

  return entitlements
}
