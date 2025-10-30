import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <div className="grid place-items-center w-full min-h-screen fixed top-0 left-0">
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-12 animate-spin", className)}
        {...props}
      />
    </div>
  );
}

export { Spinner };
