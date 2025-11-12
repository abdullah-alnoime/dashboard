import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NoCourse({ msg = "" }) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center gap-6">
        <CardTitle className="text-2xl">Course not found</CardTitle>
        <CardDescription>
          {msg || "The requested course could not be found."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
