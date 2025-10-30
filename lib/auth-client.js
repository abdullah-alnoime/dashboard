"use client";

import { customSessionClient } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, adminRole, userRole } from "./permissions";

export const authClient = createAuthClient({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER}/api/auth`,
  plugins: [
    adminClient({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
      },
    }),
    customSessionClient(),
  ],
});
