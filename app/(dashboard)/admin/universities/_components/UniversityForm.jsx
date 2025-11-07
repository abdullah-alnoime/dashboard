"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import Link from "next/link";
import {
  createUniversity,
  getUniversity,
  updateUniversity,
} from "@/requests/universities";

export default function UniversityForm({ mode, universityId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [skillInput, setSkillInput] = useState("");
  const [arSkillInput, setArSkillInput] = useState("");
  const { data: university } = useQuery({
    queryKey: ["universities", universityId],
    queryFn: () => getUniversity(universityId),
    enabled: mode === "edit",
  });
  const mutation = useMutation({
    mutationFn: (values) => {
      if (mode === "edit") {
        updateUniversity(universityId, values);
      } else {
        createUniversity(values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["universities"]);
      alert(
        `University ${mode === "edit" ? "updated" : "created"} successfully!`
      );
      router.back();
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Error occurred");
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      logo: university?.content.logo || "",
      title: university?.content.title || "",
      by: university?.content.by || "",
      status: university?.content.status || "in-progress",
      startedAt: university?.content.startedAt || "",
      graduatedAt: university?.content.graduatedAt || "",
      grade: university?.content.grade || "",
      skills: university?.content.skills || [],
      translations: {
        ar: {
          title: university?.content.translations?.ar?.title || "",
          by: university?.content.translations?.ar?.by || "",
          skills: university?.content.translations?.ar?.skills || [],
        },
      },
    },
    validationSchema: Yup.object({
      logo: Yup.string().url("Invalid URL").required("Logo is required"),
      title: Yup.string().required("Title is required"),
      by: Yup.string().required("Institution name is required"),
      status: Yup.string()
        .oneOf(["in-progress", "graduated"])
        .required("Status is required"),
      startedAt: Yup.date().when("status", {
        is: "in-progress",
        then: (schema) =>
          schema.required("Started date is required for in-progress status"),
        otherwise: (schema) => schema.nullable(),
      }),
      graduatedAt: Yup.date().when("status", {
        is: "graduated",
        then: (schema) =>
          schema.required("Graduation date is required for graduated status"),
        otherwise: (schema) => schema.nullable(),
      }),
      grade: Yup.string(),
      skills: Yup.array().of(Yup.string()),
      translations: Yup.object({
        ar: Yup.object({
          title: Yup.string().required("Arabic title is required"),
          by: Yup.string().required("Arabic institution name is required"),
          skills: Yup.array().of(Yup.string()),
        }),
      }),
    }),
    onSubmit: (values) => {
      const { _id, updatedAt, createdAt, startedAt, graduatedAt, ...data } =
        values;
      if (data.status === "graduated") {
        mutation.mutate({ ...data, graduatedAt });
      } else if (data.status === "in-progress") {
        mutation.mutate({ ...data, startedAt });
      }
    },
  });
  const handleSkillsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = skillInput.trim();
      if (skill && !formik.values.skills.includes(skill)) {
        formik.setFieldValue("skills", [...formik.values.skills, skill]);
        setSkillInput("");
      }
    }
  };
  const removeSkill = (indexToRemove) => {
    const newSkills = formik.values.skills.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("skills", newSkills);
  };
  const handleArSkillsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = arSkillInput.trim();
      if (skill && !formik.values.translations.ar.skills.includes(skill)) {
        formik.setFieldValue("translations.ar.skills", [
          ...formik.values.translations.ar.skills,
          skill,
        ]);
        setArSkillInput("");
      }
    }
  };

  const removeArSkill = (indexToRemove) => {
    const newSkills = formik.values.translations.ar.skills.filter(
      (_, index) => index !== indexToRemove
    );
    formik.setFieldValue("translations.ar.skills", newSkills);
  };
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Logo URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="logo"
            value={formik.values.logo}
            onChange={formik.handleChange}
            placeholder="https://example.com/logo.png"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.logo && formik.touched.logo && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.logo}</p>
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
            placeholder="Bachelor of Computer Science"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="by"
            value={formik.values.by}
            onChange={formik.handleChange}
            placeholder="University Name"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.by && formik.touched.by && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.by}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formik.values.status}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="in-progress">In Progress</option>
            <option value="graduated">Graduated</option>
          </select>
          {formik.errors.status && formik.touched.status && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Started At
              {formik.values.status === "in-progress" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <input
              type="date"
              name="startedAt"
              value={
                formik.values.status !== "in-progress"
                  ? ""
                  : formik.values.startedAt.split("T")[0]
              }
              onChange={formik.handleChange}
              disabled={formik.values.status === "graduated"}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {formik.errors.startedAt && formik.touched.startedAt && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startedAt}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Graduated At
              {formik.values.status === "graduated" && (
                <span className="text-red-500"> *</span>
              )}
            </label>
            <input
              type="date"
              name="graduatedAt"
              value={
                formik.values.status !== "graduated"
                  ? ""
                  : formik.values.graduatedAt.split("T")[0]
              }
              onChange={formik.handleChange}
              disabled={formik.values.status === "in-progress"}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            {formik.errors.graduatedAt && formik.touched.graduatedAt && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.graduatedAt}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Grade</label>
          <input
            type="text"
            name="grade"
            value={formik.values.grade}
            onChange={formik.handleChange}
            placeholder="e.g., 3.8 GPA, First Class Honours"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Skills</label>
          <div className="w-full px-3 py-2 border rounded focus-within:ring-2 focus-within:ring-blue-500 min-h-[42px] flex flex-wrap gap-2 items-center">
            {formik.values.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillsKeyDown}
              placeholder={
                formik.values.skills.length === 0
                  ? "Type a skill and press Enter or Space"
                  : ""
              }
              className="flex-1 min-w-[200px] outline-none"
            />
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Press Enter or Space to add a skill. Backspace to remove last skill.
          </p>
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
            Arabic Institution <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="translations.ar.by"
            value={formik.values.translations.ar.by}
            onChange={formik.handleChange}
            dir="rtl"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.translations?.ar?.by &&
            formik.touched.translations?.ar?.by && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.translations.ar.by}
              </p>
            )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Arabic Skills
          </label>
          <div className="w-full px-3 py-2 border rounded focus-within:ring-2 focus-within:ring-blue-500 min-h-[42px] flex flex-wrap gap-2 items-center">
            {formik.values.translations.ar.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                dir="rtl"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeArSkill(index)}
                  className="hover:bg-blue-200 rounded-full w-4 h-4 flex items-center justify-center"
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
            <input
              type="text"
              value={arSkillInput}
              onChange={(e) => setArSkillInput(e.target.value)}
              onKeyDown={handleArSkillsKeyDown}
              dir="rtl"
              placeholder={
                formik.values.translations.ar.skills.length === 0
                  ? "اكتب مهارة واضغط Enter أو Space"
                  : ""
              }
              className="flex-1 min-w-[200px] outline-none"
            />
          </div>
          <p className="text-gray-500 text-xs mt-1" dir="rtl">
            اضغط Enter أو Space لإضافة مهارة. Backspace لإزالة آخر مهارة.
          </p>
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
            ? "Update University"
            : "Create University"}
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
