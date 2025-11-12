import { authClient } from "@/lib/auth-client";
import { useMemo } from "react";

export function usePermissions() {
  const { data: session, isPending } = authClient.useSession();

  const permissions = useMemo(() => {
    if (!session?.user) {
      return {
        isAuthenticated: false,
        isAdmin: false,
        canCreateProject: false,
        canUpdateProject: false,
        canDeleteProject: false,
        canCreateCourse: false,
        canUpdateCourse: false,
        canDeleteCourse: false,
        canCreateUniversity: false,
        canUpdateUniversity: false,
        canDeleteUniversity: false,
        canCreateMessage: false,
        canReadMessage: false,
        canDeleteMessage: false,
        canManageUsers: false,
        canCreateUser: false,
        canListUsers: false,
        canBanUser: false,
        canDeleteUser: false,
        canSetUserPassword: false,
        canSetUserRole: false,
      };
    }
    const role = session.user.role || "user";
    const can = (resource, actions) => {
      return authClient.admin.checkRolePermission({
        role,
        permissions: { [resource]: actions },
      });
    };
    return {
      isAuthenticated: !!session,
      isAdmin: role === "admin",
      canCreateProject: can("project", ["create"]),
      canUpdateProject: can("project", ["update"]),
      canDeleteProject: can("project", ["delete"]),
      canCreateCourse: can("course", ["create"]),
      canUpdateCourse: can("course", ["update"]),
      canDeleteCourse: can("course", ["delete"]),
      canCreateUniversity: can("university", ["create"]),
      canUpdateUniversity: can("university", ["update"]),
      canDeleteUniversity: can("university", ["delete"]),
      canReadMessage: can("message", ["read"]),
      canDeleteMessage: can("message", ["delete"]),
      canCreateUser: can("user", ["create"]),
      canListUsers: can("user", ["list"]),
      canBanUser: can("user", ["ban"]),
      canDeleteUser: can("user", ["delete"]),
      canSetUserPassword: can("user", ["set-password"]),
      canSetUserRole: can("user", ["set-role"]),
    };
  }, [session]);

  return {
    permissions,
    session,
    isPending,
    user: session?.user,
  };
}
