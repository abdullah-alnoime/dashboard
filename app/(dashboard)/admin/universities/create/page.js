import UniversityForm from "../_components/UniversityForm";

export default function CreateUniversityPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Add University</h1>
        <UniversityForm mode="create" />
      </div>
    </div>
  );
}
