import apiClient from "@/lib/api-client";

export const getUniversities = async () => {
  try {
    const { data } = await apiClient.get("/education/university");
    return data.contents;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch universities");
  }
};

export const getUniversity = async (id) => {
  try {
    const { data } = await apiClient.get(`/education/university/${id}`);
    return data.content;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch university");
  }
};

export const createUniversity = async (payload) => {
  try {
    const { data } = await apiClient.post("/education/university", payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to create university");
  }
};

export const updateUniversity = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(
      `/education/university/${id}`,
      payload
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to update university");
  }
};

export const removeUniversity = async (id) => {
  try {
    const { data } = await apiClient.delete(`/education/university/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to delete university");
  }
};
