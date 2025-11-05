import apiClient from "@/lib/api-client";

export const getCourses = async () => {
  try {
    const { data } = await apiClient.get("/education/course");
    return data.contents;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch courses");
  }
};

export const getCourse = async (id) => {
  try {
    const { data } = await apiClient.get(`/education/course/${id}`);
    return data.content;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch course");
  }
};

export const createCourse = async (payload) => {
  try {
    const { data } = await apiClient.post("/education/course", payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to create course");
  }
};

export const updateCourse = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(`/education/course/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to update course");
  }
};

export const removeCourse = async (id) => {
  try {
    const { data } = await apiClient.delete(`/education/course/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to delete course");
  }
};
