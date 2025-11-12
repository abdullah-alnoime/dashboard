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
import { useDeleteCourse } from "@/hooks/useCourses";

export default function CoursesDialog({ dialog, setDialog }) {
  const { mutate, isPending } = useDeleteCourse();
  const handleCancelDialog = () => {
    setDialog({ open: false, course: null });
  };
  const handleConfirmDialog = () => {
    if (dialog.course?._id) {
      mutate(dialog.course._id, {
        onSuccess: () => setDialog({ open: false, course: null }),
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
          <DialogTitle>Delete Course</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold">{dialog.course?.title}</span>? This
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
