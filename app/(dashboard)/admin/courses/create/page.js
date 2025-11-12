import { CourseForm } from "../_components";

export default function CreateCoursePage() {
  return (
    <div className="p-5 flex justify-center items-center">
      <div className="max-w-3xl w-full">
        <CourseForm mode="create" />
      </div>
    </div>
  );
}
