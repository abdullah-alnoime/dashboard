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

export function useProjects() {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: permissions.canReadProject,
    onError: (error) => toast.error(error.message),
  });
}

export function useProject(projectId) {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
    enabled: !!projectId && permissions.canReadProject,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateProject() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("Project created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project");
    },
    onMutate: () => {
      if (!permissions.canCreateProject) {
        toast.error("You don't have permission to create projects");
        throw new Error("Insufficient permissions");
      }
    },
  });
}

export function useUpdateProject() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      toast.success("Project updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update project");
    },
    onMutate: () => {
      if (!permissions.canUpdateProject) {
        toast.error("You don't have permission to edit projects");
        throw new Error("Insufficient permissions");
      }
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
