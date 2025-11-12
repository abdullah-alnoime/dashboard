"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteMessage } from "@/hooks/useMessages";

export default function MessagesDialog({ dialog, setDialog }) {
  const { mutate, isPending } = useDeleteMessage();
  const handleCancelDialog = () => {
    setDialog({ open: false, message: null });
  };
  const handleConfirmDialog = () => {
    if (dialog.message?._id) {
      mutate(dialog.message._id, {
        onSuccess: () => setDialog({ open: false, message: null }),
      });
    }
  };
  return (
    <Dialog
      open={dialog.open}
      onOpenChange={(open) => setDialog((prev) => ({ ...prev, open }))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Message</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete the message that sent by
            <span className="font-semibold"> {dialog.message?.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleCancelDialog}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleConfirmDialog}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
