"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useDeleteUniversity } from "@/hooks/useUniversities";

export default function UniversitiesDialog({ dialog, setDialog }) {
  const { mutate, isPending } = useDeleteUniversity();
  const handleCancelDialog = () => {
    setDialog({ open: false, university: null });
  };
  const handleConfirmDialog = () => {
    if (dialog.university?._id) {
      mutate(dialog.university._id, {
        onSuccess: () => setDialog({ open: false, university: null }),
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
          <DialogTitle>Delete University</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold">{dialog.university?.title}</span>?
            This action cannot be undone.
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
