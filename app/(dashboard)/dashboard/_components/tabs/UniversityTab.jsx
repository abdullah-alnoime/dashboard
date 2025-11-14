import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function UniversityTab({ data, loading, isAdmin }) {
  if (loading)
    return (
      <p className="text-sm text-muted-foreground">Loading universities...</p>
    );
  if (!data.length > 0)
    return (
      <p className="text-sm text-muted-foreground">No universities found.</p>
    );
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Universities</h3>
        {isAdmin && (
          <Button variant="ghost" className="cursor-pointer" asChild>
            <Link href="/admin/universities">Manage Universities</Link>
          </Button>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {data.map(
          ({
            _id,
            by,
            grade,
            graduatedAt,
            logo,
            skills,
            startedAt,
            status,
            title,
          }) => {
            const isGraduated = status === "graduated";
            return (
              <Card
                key={_id}
                className="transition hover:shadow-lg border-border/60"
              >
                <CardHeader className="flex items-center gap-4">
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
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                      {by}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                  <div className="leading-relaxed space-y-2">
                    {isGraduated ? (
                      <>
                        <p>
                          <span>
                            This learner has successfully graduated from{" "}
                          </span>
                          <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                            {by}
                          </span>
                          {graduatedAt && (
                            <>
                              <span> on </span>
                              <time className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                                {formatDate(graduatedAt)}
                              </time>
                              .
                            </>
                          )}
                        </p>
                        {grade && (
                          <p>
                            <span>They achieved a final grade of </span>
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
                          <span>This learner is currently studying at </span>
                          <span className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                            {by}
                          </span>
                          {startedAt && (
                            <>
                              <span> since </span>
                              <time className="font-medium text-foreground underline underline-offset-4 decoration-dotted">
                                {formatDate(startedAt)}
                              </time>
                              .
                            </>
                          )}
                        </p>
                        <p>
                          They are still progressing toward their graduation.
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}
