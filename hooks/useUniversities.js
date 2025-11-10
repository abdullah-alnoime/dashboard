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
  return useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
    onError: (error) => toast.error(error.message),
  });
}

export function useUniversity(id) {
  return useQuery({
    queryKey: ["universities", id],
    queryFn: () => getUniversity(id),
    enabled: !!id,
    onError: (error) => toast.error(error.message),
  });
}

export function useUpsertUniversity(mode = "edit") {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";
  return useMutation({
    mutationFn: isEdit
      ? ({ id, data }) => updateUniversity(id, data)
      : (data) => createUniversity(data),
    onMutate: () => {
      if (!isEdit && !permissions.canCreateUniversity) {
        throw new Error("You don't have permission to create universities");
      }
      if (isEdit && !permissions.canUpdateUniversity) {
        throw new Error("You don't have permission to edit universities");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      toast.success(
        isEdit
          ? "University updated successfully"
          : "University created successfully"
      );
    },
    onError: (error) => {
      toast.error(
        error.message ||
          (isEdit
            ? "Failed to update university"
            : "Failed to create university")
      );
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
        throw new Error("You don't have permission to delete universities");
      }
    },
  });
}
