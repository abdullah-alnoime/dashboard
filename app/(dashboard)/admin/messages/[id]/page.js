import { Message } from "../_components";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function MessagePage({ params }) {
  const { id } = await params;
  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer"
              asChild
            >
              <Link href=".">
                <ChevronLeft />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to Messages</p>
          </TooltipContent>
        </Tooltip>
        <h2 className="text-xl font-bold">Message details</h2>
      </div>
      <Message messageId={id} />
    </>
  );
}
