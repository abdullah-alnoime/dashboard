import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NoPermissions() {
  return (
    <Card className="w-full max-w-3xl mx-auto text-center">
      <CardHeader className="text-center gap-4">
        <CardTitle className="text-2xl">Access Denied!</CardTitle>
        <CardDescription>
          You don't have permission to view messages
        </CardDescription>
      </CardHeader>
      <CardFooter className="mx-auto">
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
