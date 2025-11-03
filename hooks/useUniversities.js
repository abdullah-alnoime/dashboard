import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getUniversities,
  getUniversity,
  createUniversity,
  updateUniversity,
  removeUniversity,
} from "@/requests/universities";
import { toast } from "sonner";

export function useUniversities() {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
    enabled: permissions.canReadUniversity,
    onError: (error) => toast.error(error.message),
  });
}

export function useUniversity(universityId) {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["universities", universityId],
    queryFn: () => getUniversity(universityId),
    enabled: !!universityId && permissions.canReadUniversity,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateUniversity() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      toast.success("University created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create university");
    },
    onMutate: () => {
      if (!permissions.canCreateUniversity) {
        toast.error("You don't have permission to create universities");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useUpdateUniversity() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateUniversity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      toast.success("University updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update university");
    },
    onMutate: () => {
      if (!permissions.canUpdateUniversity) {
        toast.error("You don't have permission to edit universities");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useDeleteUniversity() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      toast.success("University deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete university");
    },
    onMutate: () => {
      if (!permissions.canDeleteUniversity) {
        toast.error("You don't have permission to delete universities");
        throw new Error("Insufficient permissions");
      }
    },
  });
}
