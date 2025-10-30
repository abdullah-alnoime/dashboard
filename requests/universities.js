import apiClient from "@/lib/api-client";

const getUniversities = async () => {
  const { data } = await apiClient.get("/education/university");
  return data;
};
const createUniversity = async (payload) => {
  try {
    const { data } = await apiClient.post("/education/university", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const getUniversity = async (id) => {
  try {
    const { data } = await apiClient.get(`/education/university/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
const updateUniversity = async (id, payload) => {
  try {
    const { data } = await apiClient.patch(
      `/education/university/${id}`,
      payload
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const removeUniversity = async (id) => {
  try {
    const { data } = await apiClient.delete(`/education/university/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
export {
  getUniversities,
  createUniversity,
  getUniversity,
  updateUniversity,
  removeUniversity,
};
