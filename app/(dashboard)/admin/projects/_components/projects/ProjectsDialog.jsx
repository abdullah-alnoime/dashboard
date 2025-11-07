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
import { useDeleteProject } from "@/hooks/useProjects";

export default function ProjectsDialog({ dialog, setDialog }) {
  const { mutate, isPending } = useDeleteProject();
  const handleCancelDialog = () => {
    setDialog({ open: false, project: null });
  };
  const handleConfirmDialog = () => {
    if (dialog.project?._id) {
      mutate(dialog.project._id, {
        onSuccess: () => setDialog({ open: false, project: null }),
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
          <DialogTitle>Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold">{dialog.project?.title}</span>? This
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
