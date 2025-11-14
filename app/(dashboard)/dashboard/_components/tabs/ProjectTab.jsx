import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectTab({ data, loading, isAdmin }) {
  if (loading) return <p>Loading projects...</p>;
  if (!data.length > 0)
    return <p className="text-gray-500">No projects found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">All Projects</h3>
        {isAdmin && (
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/admin/projects">Manage Projects</Link>
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {data.map(({ _id, preview, title, summary, tools, demo, code }) => (
          <Card
            key={_id}
            className="overflow-hidden hover:shadow-lg transition pt-0"
          >
            <Image
              src={preview}
              alt={`${title} preview`}
              width={600}
              height={400}
              className="object-cover"
              unoptimized
            />
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              <CardDescription>{summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                  key={tool}
                >
                  {tool}
                </Badge>
              ))}
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button asChild>
                <a href={demo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={code} target="_blank" rel="noopener noreferrer">
                  Source Code
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
