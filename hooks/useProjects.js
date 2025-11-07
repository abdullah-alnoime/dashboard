import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  removeProject,
} from "@/requests/projects";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useProjects() {
  const { permissions } = usePermissions();
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: permissions.canReadProject,
    onError: (error) => toast.error(error.message),
  });
}

export function useProject(id) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProject(id),
    enabled: !!id,
    onError: (error) => toast.error(error.message),
  });
}

export function useUpsertProject(mode = "edit") {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";
  return useMutation({
    mutationFn: isEdit
      ? ({ id, data }) => updateProject(id, data)
      : (data) => createProject(data),
    onMutate: () => {
      if (!isEdit && !permissions.canCreateProject) {
        throw new Error("You don't have permission to create projects");
      }
      if (isEdit && !permissions.canUpdateProject) {
        throw new Error("You don't have permission to edit projects");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success(
        isEdit ? "Project updated successfully" : "Project created successfully"
      );
    },
    onError: (error) => {
      toast.error(
        error.message ||
          (isEdit ? "Failed to update project" : "Failed to create project")
      );
    },
  });
}

export function useDeleteProject() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("Project deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project");
    },
    onMutate: () => {
      if (!permissions.canDeleteProject) {
        toast.error("You don't have permission to delete projects");
        throw new Error("Insufficient permissions");
      }
    },
  });
}
