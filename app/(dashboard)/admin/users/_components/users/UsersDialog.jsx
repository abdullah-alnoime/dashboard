import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useBanUser, useRemoveUser } from "@/hooks/useUsers";

export default function UsersDialog({ dialog, setDialog }) {
  const banUserMutation = useBanUser();
  const removeUserMutation = useRemoveUser();
  const handleConfirmDialog = () => {
    const { type, user: targetUser, reason } = dialog;
    if (!targetUser) return;
    switch (type) {
      case "ban":
        banUserMutation.mutate(
          { userId: targetUser.id, banReason: reason },
          {
            onSuccess: () => setDialog({ ...dialog, open: false }),
          }
        );
        break;
      case "remove":
        removeUserMutation.mutate(targetUser.id, {
          onSuccess: () => setDialog({ ...dialog, open: false }),
        });
        break;
    }
  };
  const handleCancelDialog = () => {
    setDialog({ ...dialog, open: false, reason: "" });
  };
  return (
    <Dialog
      open={dialog.open}
      onOpenChange={(open) => setDialog({ ...dialog, open })}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialog.type === "ban" && "Ban User"}
            {dialog.type === "remove" && "Remove User"}
          </DialogTitle>
          <DialogDescription>
            {dialog.type === "ban" &&
              `Provide a reason to ban ${dialog.user?.name}.`}
            {dialog.type === "remove" &&
              `Are you sure you want to permanently remove ${dialog.user?.name}?`}
          </DialogDescription>
        </DialogHeader>
        {dialog.type === "ban" && (
          <div className="my-4">
            <Input
              placeholder="Enter ban reason"
              value={dialog.reason}
              onChange={(e) => setDialog({ ...dialog, reason: e.target.value })}
            />
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleCancelDialog}
            disabled={banUserMutation.isPending || removeUserMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleConfirmDialog}
            disabled={banUserMutation.isPending || removeUserMutation.isPending}
          >
            {banUserMutation.isPending
              ? "Banning..."
              : removeUserMutation.isPending
              ? "Deleting..."
              : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
