import { UniversityForm } from "../_components";

export default function CreateUniversityPage() {
  return (
    <div className="p-5 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <UniversityForm mode="create" />
      </div>
    </div>
  );
}
