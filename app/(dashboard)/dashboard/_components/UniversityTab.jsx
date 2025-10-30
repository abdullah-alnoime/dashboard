import { formatDate } from "@/utils/formatDate";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";

export default function UniversityTab({ data = [], loading, isAdmin }) {
  if (loading) return <p>Loading universities...</p>;
  if (!data?.length)
    return <p className="text-gray-500">No universities found.</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Universities</h3>
        {isAdmin && (
          <Link
            href="/admin/universities"
            className="text-sm text-blue-600 hover:underline"
          >
            Manage Universities
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((university) => (
          <Card key={university._id} className="hover:shadow-md transition">
            <CardHeader className="flex items-start gap-4 p-5">
              <img
                src={university.logo}
                alt={university.title}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{university.title}</CardTitle>
                    <CardDescription>{university.by}</CardDescription>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      university.status === "graduated"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {university.status === "graduated"
                      ? "✓ Graduated"
                      : "📚 In Progress"}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0 px-5">
              <div className="text-sm text-gray-600">
                {university.status === "graduated" ? (
                  <p>Graduated: {formatDate(university.graduatedAt)}</p>
                ) : (
                  <p>Started: {formatDate(university.startedAt)}</p>
                )}
                {university.grade && <p>Grade: {university.grade}</p>}
              </div>

              {university.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {university.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
