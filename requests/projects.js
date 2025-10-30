import apiClient from "@/lib/api-client";

const getProjects = async () => {
  try {
    const { data } = await apiClient.get("/project");
    return data;
  } catch (error) {
    throw error;
  }
};
const createProject = async (payload) => {
  try {
    const { data } = await apiClient.post("/project", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const updateProject = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(`/project/${id}`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const getProject = async (id) => {
  try {
    const { data } = await apiClient.get(`/project/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const removeProject = async (id) => {
  try {
    const { data } = await apiClient.delete(`/project/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getProjects, createProject, getProject, updateProject, removeProject };
