"use client";

import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { NoUniversity } from "./universities";
import { UniversitySkeleton } from "./skeleton";
import { useUniversity } from "@/hooks/useUniversities";

export default function University({ universityId }) {
  const { data: university, isLoading } = useUniversity(universityId);
  if (isLoading) return <UniversitySkeleton />;
  if (!university) return <NoUniversity />;
  const {
    by,
    grade,
    logo,
    skills,
    startedAt,
    graduatedAt,
    status,
    title,
    translations: {
      ar: { by: arBy, skills: arSkills, title: arTitle },
    },
  } = university;
  console.log(arBy, arTitle, arSkills);
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex gap-4">
        <div className="w-16 h-16 relative rounded-full overflow-hidden border shadow">
          <Image
            src={logo}
            alt={`${by} logo`}
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
          {status === "graduated" ? (
            <>
              <p>
                This learner has successfully graduated from{" "}
                <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                  {by}
                </span>
                {graduatedAt && (
                  <>
                    {" "}
                    on{" "}
                    <time className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                      {formatDate(graduatedAt)}
                    </time>
                    .
                  </>
                )}
              </p>
              {grade && (
                <p>
                  They achieved a final grade of{" "}
                  <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                    {grade}
                  </span>
                  .
                </p>
              )}
              {skills?.length > 0 && (
                <p>
                  During their studies, they developed skills in{" "}
                  <span className="font-medium text-foreground">
                    {skills.join(", ")}
                  </span>
                  .
                </p>
              )}
            </>
          ) : (
            <>
              <p>
                This learner is currently studying at{" "}
                <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                  {by}
                </span>
                {startedAt && (
                  <>
                    {" "}
                    since{" "}
                    <time className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                      {formatDate(startedAt)}
                    </time>
                    .
                  </>
                )}
              </p>
              <p>They are still progressing toward their graduation.</p>
            </>
          )}
        </div>
        {(arBy || arSkills.length > 0 || arTitle) && (
          <>
            <Separator className="my-6" />
            <h3 className="text-xl text-foreground font-semibold mb-4">
              Arabic Translations
            </h3>
            <div>
              <div dir="rtl" className="space-y-3 leading-relaxed">
                {arTitle && (
                  <h4 className="text-2xl font-bold text-foreground mt-4">
                    {arTitle}
                  </h4>
                )}
                {status === "graduated" ? (
                  <>
                    <p>
                      تخرّج هذا الطالب من{" "}
                      <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                        {arBy || by}
                      </span>
                      {graduatedAt && ` في ${formatDate(graduatedAt)}.`}
                    </p>
                    {grade && (
                      <p>
                        وحصل على معدل{" "}
                        <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                          {grade}
                        </span>
                        .
                      </p>
                    )}
                    {arSkills.length > 0 && (
                      <p>
                        وخلال دراسته اكتسب مهارات في{" "}
                        <span className="font-medium text-foreground">
                          {arSkills.join("، ")}
                        </span>
                        .
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p>
                      هذا الطالب يدرس حالياً في{" "}
                      <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                        {arBy}
                      </span>
                      {startedAt && ` منذ ${formatDate(startedAt)}.`}
                    </p>
                    <p>وما زال في طريقه نحو التخرّج.</p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
