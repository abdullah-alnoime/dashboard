import ProjectForm from "../../_components/ProjectForm";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
        <ProjectForm mode="edit" projectId={id} />
      </div>
    </div>
  );
}
