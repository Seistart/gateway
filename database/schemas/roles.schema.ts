import { integer, pgTable, primaryKey, serial, text } from "drizzle-orm/pg-core"
import { UserTable } from "./users.schema"

export const RoleTable = pgTable("role", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
})

export const PermissionTable = pgTable("permission", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
})

export const RolePermissionTable = pgTable(
  "role_permission",
  {
    roleId: integer("role_id")
      .references(() => RoleTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    permissionId: integer("permission_id")
      .references(() => PermissionTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.roleId, table.permissionId] }),
    }
  }
)

export const UserRoleTable = pgTable(
  "user_role",
  {
    userId: text("user_id")
      .references(() => UserTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
    roleId: integer("role_id")
      .references(() => RoleTable.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.roleId, table.userId] }),
    }
  }
)
