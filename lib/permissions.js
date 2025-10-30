import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
  ...defaultStatements,
  project: ["create", "read", "update", "delete"],
  course: ["create", "read", "update", "delete"],
  university: ["create", "read", "update", "delete"],
  message: ["create", "read", "delete"],
};

export const ac = createAccessControl(statement);

export const userRole = ac.newRole({
  project: ["read"],
  course: ["read"],
  university: ["read"],
  message: ["create"],
});

export const adminRole = ac.newRole({
  ...adminAc.statements,
  project: ["create", "read", "update", "delete"],
  course: ["create", "read", "update", "delete"],
  university: ["create", "read", "update", "delete"],
  message: ["create", "read", "delete"],
});
