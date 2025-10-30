import apiClient from "@/lib/api-client";

const getCourses = async () => {
  try {
    const { data } = await apiClient.get("/education/course");
    return data;
  } catch (error) {
    throw error;
  }
};
const createCourse = async (payload) => {
  try {
    const { data } = await apiClient.post("/education/course", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const getCourse = async (id) => {
  try {
    const { data } = await apiClient.get(`/education/course/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
const updateCourse = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(`/education/course/${id}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const removeCourse = async (id) => {
  try {
    const { data } = await apiClient.delete(`/education/course/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getCourses, createCourse, getCourse, updateCourse, removeCourse };
