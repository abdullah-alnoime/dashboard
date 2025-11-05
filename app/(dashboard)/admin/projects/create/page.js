import ProjectForm from "../_components/ProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="p-5 flex justify-center items-center">
      <div className="max-w-3xl w-full shadow-md rounded-lg p-8 bg-neutral-50">
        <h1 className="text-2xl font-bold mb-6">Create Project</h1>
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}
