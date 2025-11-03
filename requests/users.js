import { authClient } from "@/lib/auth-client";

export const getUsers = async (search = "") => {
  const { data, error } = await authClient.admin.listUsers({
    query: {
      limit: 100,
      offset: 0,
      searchValue: search,
      searchField: "email",
      searchOperator: "starts_with",
    },
  });
  if (error) throw new Error(error.message || "Failed to fetch users");
  return data.users;
};

export const createUser = async (payload) => {
  const { data, error } = await authClient.admin.createUser(payload);
  if (error) throw new Error(error.message || "Failed to create user");
  return data;
};

export const updateUserRole = async (payload) => {
  const { data, error } = await authClient.admin.setRole(payload);
  if (error) throw new Error(error.message || "Failed to update user role");
  return data;
};

export const banUser = async (payload) => {
  const { data, error } = await authClient.admin.banUser(payload);
  if (error) throw new Error(error.message || "Failed to ban user");
  return data;
};

export const unbanUser = async (userId) => {
  const { data, error } = await authClient.admin.unbanUser({ userId });
  if (error) throw new Error(error.message || "Failed to unban user");
  return data;
};

export const removeUser = async (userId) => {
  const { data, error } = await authClient.admin.removeUser({ userId });
  if (error) throw new Error(error.message || "Failed to remove user");
  return data;
};
