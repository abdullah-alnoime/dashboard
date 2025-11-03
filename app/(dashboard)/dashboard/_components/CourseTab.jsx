import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function CourseTab({ data = [], loading, isAdmin }) {
  if (loading) return <p>Loading courses...</p>;
  if (!data?.length) return <p className="text-gray-500">No courses found.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Courses & Certifications</h3>
        {isAdmin && (
          <a
            href="/admin/courses"
            className="text-sm text-blue-600 hover:underline"
          >
            Manage Courses →
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((course) => (
          <Card key={course._id} className="hover:shadow-md transition">
            <CardHeader className="flex items-start gap-3 p-4">
              <img
                src={course.logo}
                alt={course.title}
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1">
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>{course.by}</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="pt-0 px-4">
              <div className="mt-2 flex items-center gap-3 text-sm text-gray-600">
                <span>
                  Grade:{" "}
                  <span className="font-medium text-green-600">
                    {course.grade}
                  </span>
                </span>
                <span>{formatDate(course.earnedAt)}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {course.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="px-4 pt-0">
              <Link
                href={course.credential}
                className="text-sm text-blue-600 hover:underline"
              >
                🏆 View Credential
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
