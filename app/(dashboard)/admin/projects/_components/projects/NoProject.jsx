import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoProject({ msg = "" }) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center gap-6">
        <CardTitle className="text-2xl">Project not found</CardTitle>
        <CardDescription>
          {msg || "The requested project could not be found."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
