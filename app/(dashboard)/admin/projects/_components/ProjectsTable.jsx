"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { getProjects, removeProject } from "@/requests/projects";

export default function ProjectsTable() {
  const queryClient = useQueryClient();
  const { data: session, isPending } = authClient.useSession();
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    enabled: !!session,
  });
  const deleteMutation = useMutation({
    mutationFn: removeProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      alert("Project deleted successfully!");
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Failed to delete project");
    },
  });
  if (isPending) return <div>Checking session...</div>;
  if (session?.user?.role !== "admin") return null;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="max-w-7xl mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Management</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">
          Back to Dashboard
        </a>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Link
          href="projects/create"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Project
        </Link>
      </div>

      {isLoading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Summary", "Tools", "Actions"].map((h) => (
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
              {projects.map(({ _id, title, summary, tools }) => (
                <tr key={_id}>
                  <td className="px-6 py-4">{title}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{summary}</td>
                  <td className="px-6 py-4">{tools.join(", ")}</td>
                  <td className="px-6 py-4 space-x-3">
                    <Link
                      href={`projects/${_id}`}
                      className="text-gray-600 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this project?"))
                          deleteMutation.mutateAsync(_id);
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
        </div>
      )}
    </div>
  );
}
