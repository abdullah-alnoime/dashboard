import { ProjectForm } from "../_components";

export default function CreateProjectPage() {
  return (
    <div className="p-5 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <ProjectForm mode="create" />
      </div>
    </div>
  );
}
