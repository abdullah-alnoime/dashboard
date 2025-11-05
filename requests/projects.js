import apiClient from "@/lib/api-client";

export const getProjects = async () => {
  try {
    const { data } = await apiClient.get("/project");
    return data.contents;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch projects");
  }
};

export const getProject = async (id) => {
  try {
    const { data } = await apiClient.get(`/project/${id}`);
    return data.content;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch project");
  }
};

export const createProject = async (payload) => {
  try {
    const { data } = await apiClient.post("/project", payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to create project");
  }
};

export const updateProject = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(`/project/${id}`, payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to update project");
  }
};

export const removeProject = async (id) => {
  try {
    const { data } = await apiClient.delete(`/project/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to delete project");
  }
};
