"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { getCourses, removeCourse } from "@/requests/courses";
import Link from "next/link";

export default function CoursesTable() {
  const queryClient = useQueryClient();
  const { data: session, isPending } = authClient.useSession();
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
    enabled: !!session,
  });
  const deleteMutation = useMutation({
    mutationFn: (courseId) => removeCourse(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      alert("Course deleted successfully!");
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Failed to delete course");
    },
  });
  if (isPending) return <div>Loading session...</div>;
  if (session?.user?.role !== "admin")
    return <div>You're not authorized to access this route!</div>;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </a>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Courses</h2>
        <Link
          href="courses/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Course
        </Link>
      </div>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : courses?.contents.length === 0 ? (
        <p className="text-gray-500">No courses found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Title", "Provider", "Grade", "Skills", "Actions"].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses?.contents.map(({ _id, title, by, grade, skills }) => (
              <tr key={_id}>
                <td className="px-6 py-4">{title}</td>
                <td className="px-6 py-4">{by}</td>
                <td className="px-6 py-4">{grade}</td>
                <td className="px-6 py-4">{skills.join(", ")}</td>
                <td className="px-6 py-4 space-x-3">
                  <Link
                    href={`courses/${_id}`}
                    className="text-gray-600 hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm("Delete this course?"))
                        deleteMutation.mutate(_id);
                    }}
                    className="text-red-600 cursor-pointer hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
