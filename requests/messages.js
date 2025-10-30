import apiClient from "@/lib/api-client";

const getMessages = async () => {
  try {
    const { data } = await apiClient.get("/message");
    return data;
  } catch (error) {
    throw error;
  }
};
const createMessage = async (payload) => {
  try {
    const { data } = await apiClient.post("/message", payload);
    return data;
  } catch (error) {
    throw error;
  }
};
const getMessage = async (id) => {
  try {
    const { data } = await apiClient.get(`/message/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
const removeMessage = async (id) => {
  try {
    const { data } = await apiClient.delete(`/message/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getMessages, createMessage, getMessage, removeMessage };
