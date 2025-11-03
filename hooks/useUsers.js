import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getUsers,
  createUser,
  updateUserRole,
  banUser,
  unbanUser,
  removeUser,
} from "@/requests/users";
import { toast } from "sonner";

export function useUsers(searchQuery = "") {
  const { permissions } = usePermissions();
  return useQuery({
    queryKey: ["users", searchQuery],
    queryFn: () => getUsers(searchQuery),
    enabled: permissions.canListUsers,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateUser() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
    onMutate: () => {
      if (!permissions.canCreateUser) {
        toast.error("You don't have permission to create users");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useUpdateUserRole() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user role");
    },
    onMutate: () => {
      if (!permissions.canSetUserRole) {
        toast.error("You don't have permission to update user roles");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useBanUser() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: banUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User banned successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to ban user");
    },
    onMutate: () => {
      if (!permissions.canBanUser) {
        toast.error("You don't have permission to ban users");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useUnbanUser() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unbanUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User unbanned successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to unban user");
    },
    onMutate: () => {
      if (!permissions.canBanUser) {
        toast.error("You don't have permission to unban users");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useRemoveUser() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User removed successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove user");
    },
    onMutate: () => {
      if (!permissions.canDeleteUser) {
        toast.error("You don't have permission to remove users");
        throw new Error("Insufficient permissions");
      }
    },
  });
}
