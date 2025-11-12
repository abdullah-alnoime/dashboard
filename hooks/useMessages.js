import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePermissions } from "@/hooks/usePermissions";
import {
  getMessages,
  getMessage,
  createMessage,
  removeMessage,
} from "@/requests/messages";
import { toast } from "sonner";

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    onError: (error) => toast.error(error.message),
  });
}

export function useMessage(id) {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessage(id),
    enabled: !!id,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      toast.success("Message sent successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to send message");
    },
  });
}

export function useDeleteMessage() {
  const { permissions } = usePermissions();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeMessage,
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      toast.success("Message deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete message");
    },
    onMutate: () => {
      if (!permissions.canDeleteMessage) {
        throw new Error("You don't have permission to delete messages");
      }
    },
  });
}
