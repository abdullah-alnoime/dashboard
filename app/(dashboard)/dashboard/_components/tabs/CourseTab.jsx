import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function CourseTab({ data, loading, isAdmin }) {
  if (loading)
    return <p className="text-sm text-muted-foreground">Loading courses..</p>;
  if (!data.length > 0)
    return <p className="text-sm text-muted-foreground">No courses found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Courses & Certifications</h3>
        {isAdmin && (
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/admin/courses">Manage Courses</Link>
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(
          ({ _id, logo, title, by, skills, earnedAt, grade, credential }) => (
            <Card
              key={_id}
              className="hover:shadow-lg border-border/60 transition"
            >
              <CardHeader className="flex items-center gap-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border shadow">
                  <Image
                    src={logo}
                    alt={`${title} logo`}
                    fill
                    unoptimized
                    className="object-contain p-0.5 rounded-full"
                  />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold">{title}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground">
                    {by}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div className="leading-relaxed space-y-2">
                  {grade ? (
                    <>
                      <p>
                        This learner has successfully completed this course{" "}
                        <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                          {by}
                        </span>
                        {earnedAt && (
                          <>
                            {" "}
                            on{" "}
                            <time className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                              {formatDate(earnedAt)}
                            </time>
                            .
                          </>
                        )}
                      </p>
                      <p>
                        They achieved a grade of{" "}
                        <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                          {grade}
                        </span>
                        .
                      </p>
                      {skills?.length > 0 && (
                        <p>
                          During the course, they developed skills in{" "}
                          <span className="font-medium text-foreground">
                            {skills.join(", ")}
                          </span>
                          .
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      This learner is currently enrolled in this course at {by}.
                    </p>
                  )}
                  {credential && (
                    <Button className="cursor-pointer" asChild>
                      <a
                        href={credential}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Credential
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  );
}
