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
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["messages"],
    queryFn: getMessages,
    enabled: permissions.canReadMessage,
    onError: (error) => toast.error(error.message),
  });
}

export function useMessage(messageId) {
  const { permissions } = usePermissions();

  return useQuery({
    queryKey: ["messages", messageId],
    queryFn: () => getMessage(messageId),
    enabled: !!messageId && permissions.canReadMessage,
    onError: (error) => toast.error(error.message),
  });
}

export function useCreateMessage() {
  const { permissions } = usePermissions();
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
    onMutate: () => {
      if (!permissions.canCreateMessage) {
        toast.error("You don't have permission to send messages");
        throw new Error("Insufficient permissions");
      }
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
        toast.error("You don't have permission to delete messages");
        throw new Error("Insufficient permissions");
      }
    },
  });
}
