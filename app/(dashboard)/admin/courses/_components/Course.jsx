"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/formatDate";
import { NoCourse } from "./courses";
import { CourseSkeleton } from "./skeleton";
import { useCourse } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";

export default function Course({ courseId }) {
  const { data: course, isLoading } = useCourse(courseId);
  if (isLoading) return <CourseSkeleton />;
  if (!course) return <NoCourse />;
  const {
    logo,
    title,
    by,
    skills,
    earnedAt,
    grade,
    credential,
    translations: {
      ar: { title: arTitle, by: arBy, skills: arSkills },
    },
  } = course;
  return (
    <Card className="w-full max-w-3xl mx-auto">
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
          <CardTitle className="text-3xl font-bold">{title}</CardTitle>
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
            <p>This learner is currently enrolled in this course at {by}.</p>
          )}

          {credential && (
            <Button
              variant="link"
              className="px-0 hover:text-blue-600 cursor-pointer"
              asChild
            >
              <a href={credential} target="_blank" rel="noopener noreferrer">
                View Credential
              </a>
            </Button>
          )}
        </div>
        {(arTitle || arBy || arSkills.length > 0) && (
          <>
            <Separator className="my-6" />
            <h3 className="text-xl text-foreground font-semibold mb-4">
              Arabic Translations
            </h3>
            <div dir="rtl" className="space-y-3 leading-relaxed text-right">
              {arTitle && (
                <h4 className="text-2xl font-bold text-foreground mt-4">
                  {arTitle}
                </h4>
              )}
              {grade ? (
                <>
                  <p>
                    أكمل هذا المتعلم بنجاح دورة{" "}
                    <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                      {arBy || by}
                    </span>
                    {earnedAt && (
                      <>
                        {" "}
                        بتاريخ{" "}
                        <date className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                          {formatDate(earnedAt)}
                        </date>
                        .
                      </>
                    )}
                  </p>
                  <p>
                    وحصل على درجة{" "}
                    <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                      {grade}
                    </span>
                    .
                  </p>
                  {arSkills.length > 0 && (
                    <p>
                      وخلال هذه الدورة، طوّر مهارات في{" "}
                      <span className="font-medium text-foreground">
                        {arSkills.join("، ")}
                      </span>
                      .
                    </p>
                  )}
                </>
              ) : (
                <p>هذا المتعلم مسجّل حالياً في دورة {arBy || by}.</p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
