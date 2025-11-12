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

export function useUpsertCourse(mode = "edit") {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  const isEdit = mode === "edit";
  return useMutation({
    mutationFn: isEdit
      ? ({ id, data }) => updateCourse(id, data)
      : (data) => createCourse(data),
    onMutate: () => {
      if (!isEdit && !permissions.canCreateCourse) {
        throw new Error("You don't have permission to create courses");
      }
      if (isEdit && !permissions.canUpdateCourse) {
        throw new Error("You don't have permission to edit courses");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      toast.success(
        isEdit ? "Course updated successfully" : "Course created successfully"
      );
    },
    onError: (error) => {
      toast.error(
        error.message ||
          (isEdit ? "Failed to update course" : "Failed to create course")
      );
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
