"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUniversities, removeUniversity } from "@/requests/universities";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function UniversitiesTable() {
  const { data: session, isPending } = authClient.useSession();
  const queryClient = useQueryClient();
  const { data: universities = [], isLoading } = useQuery({
    queryKey: ["universities"],
    queryFn: getUniversities,
    enabled: !!session,
  });
  const deleteMutation = useMutation({
    mutationFn: removeUniversity,
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      toast.success("University deleted successfully!");
    },
    onError: (error) => toast.error(error.message),
  });
  if (isPending) return <Spinner />;
  if (session?.user?.role !== "admin") return null;
  return (
    <>
      {isLoading ? (
        <p>Loading universities...</p>
      ) : universities.length === 0 ? (
        <p className="text-gray-500">No universities found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Provider", "Status", "Actions"].map((h) => (
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
              {universities.map(({ _id, title, by, status }) => (
                <tr key={_id}>
                  <td className="px-6 py-4">{title}</td>
                  <td className="px-6 py-4">{by}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        status === "graduated"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                  <td className="px-6 py-4 space-x-3">
                    <Link
                      href={`universities/${_id}`}
                      className="text-gray-600 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this university?"))
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
        </div>
      )}
    </>
  );
}
