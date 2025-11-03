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
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    enabled: permissions.canReadCourse,
    onError: (error) => toast.error(error.message),
  });
}

export function useCourse(courseId) {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
    enabled: !!courseId && permissions.canReadCourse,
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
        toast.error("You don't have permission to create courses");
        throw new Error("Insufficient permissions");
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
        toast.error("You don't have permission to edit courses");
        throw new Error("Insufficient permissions");
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
        toast.error("You don't have permission to delete courses");
        throw new Error("Insufficient permissions");
      }
    },
  });
}
