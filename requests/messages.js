import apiClient from "@/lib/api-client";

export const getMessages = async () => {
  try {
    const { data } = await apiClient.get("/message");
    return data.contents;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch messages");
  }
};

export const getMessage = async (id) => {
  try {
    const { data } = await apiClient.get(`/message/${id}`);
    return data.content;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to fetch message");
  }
};

export const createMessage = async (payload) => {
  try {
    const { data } = await apiClient.post("/message", payload);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to send message");
  }
};

export const removeMessage = async (id) => {
  try {
    const { data } = await apiClient.delete(`/message/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.msg || "Failed to delete message");
  }
};
