import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  removeCourse,
} from "@/requests/courses";
import { toast } from "sonner";

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    onError: (error) => toast.error(error.message),
  });
}

export function useCourse(id) {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: () => getCourse(id),
    enabled: !!id,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateCourse() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      toast.success("Course created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create course");
    },
    onMutate: () => {
      if (!permissions.canCreateCourse) {
        throw new Error("You don't have permission to create courses");
      }
    },
  });
}

export function useUpdateCourse() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      toast.success("Course updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update course");
    },
    onMutate: () => {
      if (!permissions.canUpdateCourse) {
        throw new Error("You don't have permission to edit courses");
      }
    },
  });
}

export function useDeleteCourse() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCourse,
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      toast.success("Course deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete course");
    },
    onMutate: () => {
      if (!permissions.canDeleteCourse) {
        throw new Error("You don't have permission to delete courses");
      }
    },
  });
}
