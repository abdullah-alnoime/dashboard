"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createProject, getProject, updateProject } from "@/requests/projects";
import Link from "next/link";
import { useState } from "react";

export default function ProjectForm({ mode, projectId }) {
  const [toolInput, setToolInput] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
    enabled: mode === "edit",
  });

  const mutation = useMutation({
    mutationFn: (values) => {
      if (mode === "edit") {
        updateProject(projectId, values);
      } else {
        createProject(values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      alert(`Project ${mode === "edit" ? "updated" : "created"} successfully!`);
      router.back();
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Something went wrong");
    },
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: project?.content || {
      preview: "",
      title: "",
      summary: "",
      tools: [],
      demo: "",
      code: "",
      content: {
        description: "",
        responsive: {
          mobile: "",
          desktop: "",
        },
      },
      translations: {
        ar: {
          title: "",
          summary: "",
          content: {
            description: "",
          },
        },
      },
    },
    validationSchema: Yup.object({
      preview: Yup.string().required("Preview is required"),
      title: Yup.string().required("Title is required"),
      summary: Yup.string().required("Summary is required"),
      tools: Yup.array()
        .of(Yup.string())
        .min(1, "At least one tool is required")
        .required("Tools are required"),
      demo: Yup.string()
        .url("Invalid demo URL")
        .required("Demo URL is required"),
      code: Yup.string()
        .url("Invalid code URL")
        .required("Code URL is required"),
      content: Yup.object({
        description: Yup.string().required("Description is required"),
        responsive: Yup.object({
          mobile: Yup.string().required("Mobile preview is required"),
          desktop: Yup.string().required("Desktop preview is required"),
        }),
      }),
      translations: Yup.object({
        ar: Yup.object({
          title: Yup.string().required("Arabic title is required"),
          summary: Yup.string().required("Arabic summary is required"),
          content: Yup.object({
            description: Yup.string().required(
              "Arabic description is required"
            ),
          }),
        }),
      }),
    }),
    onSubmit: (values) => {
      const { _id, updatedAt, createdAt, ...data } = values;
      mutation.mutate(data);
    },
  });

  const handleToolsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tool = toolInput.trim();
      if (tool && !formik.values.tools.includes(tool)) {
        formik.setFieldValue("tools", [...formik.values.tools, tool]);
        setToolInput("");
      }
    }
  };

  const removeTool = (indexToRemove) => {
    const newTools = formik.values.tools.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("tools", newTools);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Preview URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="preview"
            value={formik.values.preview}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.preview && formik.touched.preview && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.preview}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            name="summary"
            value={formik.values.summary}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          {formik.errors.summary && formik.touched.summary && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.summary}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tools <span className="text-red-500">*</span>
          </label>
          <div className="w-full px-3 py-2 border rounded focus-within:ring-2 focus-within:ring-blue-500 min-h-[42px] flex flex-wrap gap-2 items-center">
            {formik.values.tools.map((tool, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {tool}
                <button
                  type="button"
                  onClick={() => removeTool(index)}
                  className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
                  aria-label={`Remove ${tool}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={toolInput}
              onChange={(e) => setToolInput(e.target.value)}
              onKeyDown={handleToolsKeyDown}
              placeholder={
                formik.values.tools.length === 0
                  ? "Type a tool and press Enter or Space"
                  : ""
              }
              className="flex-1 min-w-[200px] outline-none"
            />
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Press Enter or Space to add a tool. Backspace to remove last tool.
          </p>
          {formik.errors.tools && formik.touched.tools && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.tools}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Demo URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="demo"
            value={formik.values.demo}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.demo && formik.touched.demo && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.demo}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Code URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="code"
            value={formik.values.code}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.code && formik.touched.code && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.code}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="content.description"
            value={formik.values.content.description}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {formik.errors.content?.description &&
            formik.touched.content?.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.content.description}
              </p>
            )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Mobile Preview URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="content.responsive.mobile"
              value={formik.values.content.responsive.mobile}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.content?.responsive?.mobile &&
              formik.touched.content?.responsive?.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.content.responsive.mobile}
                </p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Desktop Preview URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              name="content.responsive.desktop"
              value={formik.values.content.responsive.desktop}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.content?.responsive?.desktop &&
              formik.touched.content?.responsive?.desktop && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.content.responsive.desktop}
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Arabic Translations Section */}
      <fieldset className="border border-gray-300 rounded-lg p-4 space-y-4">
        <legend className="text-lg font-semibold px-2">
          Arabic Translations (الترجمة العربية)
        </legend>

        <div>
          <label className="block text-sm font-medium mb-1">
            Arabic Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="translations.ar.title"
            value={formik.values.translations.ar.title}
            onChange={formik.handleChange}
            dir="rtl"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.translations?.ar?.title &&
            formik.touched.translations?.ar?.title && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.translations.ar.title}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Arabic Summary <span className="text-red-500">*</span>
          </label>
          <textarea
            name="translations.ar.summary"
            value={formik.values.translations.ar.summary}
            onChange={formik.handleChange}
            dir="rtl"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          {formik.errors.translations?.ar?.summary &&
            formik.touched.translations?.ar?.summary && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.translations.ar.summary}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Arabic Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="translations.ar.content.description"
            value={formik.values.translations.ar.content.description}
            onChange={formik.handleChange}
            dir="rtl"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
          {formik.errors.translations?.ar?.content?.description &&
            formik.touched.translations?.ar?.content?.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.translations.ar.content.description}
              </p>
            )}
        </div>
      </fieldset>

      {/* Form Actions */}
      <div className="pt-6 flex gap-3">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending
            ? `${mode === "edit" ? "Updating..." : "Creating..."}`
            : mode === "edit"
            ? "Update Project"
            : "Create Project"}
        </button>
        <Link
          href="."
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
