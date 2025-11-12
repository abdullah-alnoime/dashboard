"use client";

import Image from "next/image";
import { useProject } from "@/hooks/useProjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectSkeleton } from "./skeleton";
import { NoProject } from "./projects";

export default function Project({ projectId }) {
  const { data: project, isLoading } = useProject(projectId);
  if (isLoading) return <ProjectSkeleton />;
  if (!project) return <NoProject />;
  const {
    preview,
    title,
    summary,
    tools,
    demo,
    code,
    content: {
      description,
      responsive: { mobile, desktop },
    },
    translations: {
      ar: {
        title: arTitle,
        summary: arSummary,
        content: { description: arDescription },
      },
    },
  } = project;
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="mb-4 rounded-lg overflow-hidden border border-border">
          <Image
            src={preview}
            alt={`${title} preview`}
            width={1200}
            height={630}
            unoptimized
            className="w-full h-auto object-cover"
          />
        </div>
        <CardTitle className="text-3xl font-bold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-base mt-2 text-muted-foreground/90">
          {summary}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-foreground/80 leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-foreground/90"
            >
              {tool}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {demo && (
            <Button asChild>
              <a href={demo} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}
          {code && (
            <Button variant="outline" asChild>
              <a href={code} target="_blank" rel="noopener noreferrer">
                View Code
              </a>
            </Button>
          )}
        </div>
        {(arTitle || arSummary || arDescription) && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground/90">
                Arabic Translations
              </h3>
              <div dir="rtl" className="space-y-3">
                {arTitle && (
                  <h4 className="text-2xl font-bold text-foreground">
                    {arTitle}
                  </h4>
                )}
                {arSummary && <p className="text-foreground/80">{arSummary}</p>}
                {arDescription && (
                  <p className="text-foreground/80 leading-relaxed">
                    {arDescription}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        {(desktop || mobile) && (
          <>
            <Separator className="my-6" />
            <div>
              <h3 className="text-xl font-semibold mb-4 text-foreground/90">
                Responsive Design
              </h3>
              <div className="flex flex-wrap justify-center items-start gap-4">
                {desktop && (
                  <div className="flex-1 min-w-[200px] max-w-md">
                    <p className="text-sm text-muted-foreground/90 mb-2 text-center">
                      Desktop
                    </p>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <Image
                        src={desktop}
                        alt={`${title} desktop preview`}
                        width={400}
                        height={300}
                        unoptimized
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}
                {mobile && (
                  <div className="flex-1 min-w-[150px] max-w-xs">
                    <p className="text-sm text-muted-foreground/90 mb-2 text-center">
                      Mobile
                    </p>
                    <div className="rounded-lg overflow-hidden border border-border">
                      <Image
                        src={mobile}
                        alt={`${title} mobile preview`}
                        width={200}
                        height={400}
                        unoptimized
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
