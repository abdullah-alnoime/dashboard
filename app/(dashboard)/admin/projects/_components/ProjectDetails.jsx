"use client";

import Link from "next/link";
import Image from "next/image";
import { useProject } from "@/hooks/useProjects";

export default function ProjectDetails({ projectId }) {
  const { data: project, isLoading } = useProject(projectId);
  if (isLoading) return <p>Loading project...</p>;
  if (!project) return <p>Project not found.</p>;
  const { title, preview, summary, tools, content, code, demo, translations } =
    project;
  const description = content?.description ?? "";
  const desktop = content?.responsive?.desktop ?? "";
  const mobile = content?.responsive?.mobile ?? "";
  const ar = translations?.ar;
  const arTitle = ar?.title ?? "";
  const arSummary = ar?.summary ?? "";
  const arDescription = ar?.content?.description ?? "";
  return (
    <div className="max-w-3xl p-8 w-full shadow-md rounded-lg bg-neutral-50">
      {preview && (
        <Image
          src={preview}
          alt={`${title} preview`}
          width={200}
          height={200}
          unoptimized
        />
      )}
      <h2 className="text-3xl font-bold my-4">{title}</h2>
      <p className="text-gray-700 mb-4">{summary}</p>
      {tools?.length > 0 && (
        <p className="text-gray-600 mb-2">{tools.join(", ")}</p>
      )}
      <p className="text-gray-600 mb-4">{description}</p>

      <div className="space-x-3 mt-6">
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Live Demo
          </a>
        )}
        {code && (
          <a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View Code
          </a>
        )}
      </div>

      {ar && (arTitle || arSummary || arDescription) && (
        <>
          <h2 className="text-2xl font-bold my-4">Arabic translations</h2>
          <div dir="rtl">
            {arTitle && <h3 className="text-3xl font-bold mb-4">{arTitle}</h3>}
            {arSummary && <p className="text-gray-700 mb-4">{arSummary}</p>}
            {arDescription && (
              <p className="text-gray-600 mb-4">{arDescription}</p>
            )}
          </div>
        </>
      )}

      {(desktop || mobile) && (
        <>
          <h2 className="text-2xl font-bold my-4">Responsive design</h2>
          <div className="flex justify-center items-center gap-4">
            {desktop && (
              <Image
                src={desktop}
                alt={`${title} desktop preview`}
                width={200}
                height={200}
                unoptimized
              />
            )}
            {mobile && (
              <Image
                src={mobile}
                alt={`${title} mobile preview`}
                width={200}
                height={200}
                unoptimized
              />
            )}
          </div>
        </>
      )}

      <div className="pt-6 flex gap-3">
        <Link
          href={`${projectId}/edit`}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>
        <Link
          href="."
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
