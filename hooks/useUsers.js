import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getUsers,
  createUser,
  updateUserRole,
  banUser,
  unbanUser,
  removeUser,
  changePassword,
} from "@/requests/users";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("User created successfully");
      router.back();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create user");
    },
    onMutate: () => {
      if (!permissions.canCreateUser) {
        throw new Error("You don't have permission to create users");
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
        throw new Error("You don't have permission to update user roles");
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
        throw new Error("You don't have permission to ban users");
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
        throw new Error("You don't have permission to unban users");
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
        throw new Error("You don't have permission to remove users");
      }
    },
  });
}
export function useChangePassword() {
  const { permissions } = usePermissions();
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully", {
        description: "All other sessions have been logged out for security.",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to changed password");
    },
    onMutate: () => {
      if (!permissions.canChangePassword) {
        throw new Error("You don't have permission to change password");
      }
    },
  });
}
