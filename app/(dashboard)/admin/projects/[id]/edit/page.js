import ProjectForm from "../../_components/ProjectForm";

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  return (
    <div className="p-5 flex justify-center items-center">
      <div className="max-w-3xl w-full shadow-md rounded-lg p-8 bg-neutral-50">
        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>
        <ProjectForm mode="edit" projectId={id} />
      </div>
    </div>
  );
}
