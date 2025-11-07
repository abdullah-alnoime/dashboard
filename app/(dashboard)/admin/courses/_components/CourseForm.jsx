"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { createCourse, getCourse, updateCourse } from "@/requests/courses";
import Link from "next/link";

export default function CourseForm({ mode, courseId }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [skillInput, setSkillInput] = React.useState("");
  const [arSkillInput, setArSkillInput] = React.useState("");

  const { data: course } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
    enabled: mode === "edit",
  });

  const mutation = useMutation({
    mutationFn: (values) => {
      if (mode === "edit") {
        return updateCourse(courseId, values);
      } else {
        return createCourse(values);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
      alert(`Course ${mode === "edit" ? "updated" : "created"} successfully!`);
      router.back();
    },
    onError: (err) => {
      alert(err.response?.data?.msg || "Something went wrong");
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      logo: course?.content.logo || "",
      title: course?.content.title || "",
      by: course?.content.by || "",
      skills: course?.content.skills || [],
      earnedAt: course?.content.earnedAt || "",
      grade: course?.content.grade || "",
      credential: course?.content.credential || "",
      translations: {
        ar: {
          title: course?.content.translations.ar.title || "",
          by: course?.content.translations.ar.by || "",
          skills: course?.content.translations.ar.skills || [],
        },
      },
    },
    validationSchema: Yup.object({
      logo: Yup.string().url("Invalid URL").required("Logo is required"),
      title: Yup.string().required("Title is required"),
      by: Yup.string().required("Provider is required"),
      skills: Yup.array()
        .of(Yup.string())
        .min(1, "At least one skill is required")
        .required("Skills are required"),
      earnedAt: Yup.date().required("Earned date is required"),
      grade: Yup.string().required("Grade is required"),
      credential: Yup.string()
        .url("Invalid URL")
        .required("Credential URL is required"),
      translations: Yup.object({
        ar: Yup.object({
          title: Yup.string().required("Arabic title is required"),
          by: Yup.string().required("Arabic provider is required"),
          skills: Yup.array()
            .of(Yup.string())
            .min(1, "At least one Arabic skill is required")
            .required("Arabic skills are required"),
        }),
      }),
    }),
    onSubmit: (values) => {
      const { _id, updatedAt, createdAt, ...data } = values;
      mutation.mutate(data);
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

  // Arabic skills handlers
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
      {/* Main Fields Section */}
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
            placeholder="Course Title"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Provider <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="by"
            value={formik.values.by}
            onChange={formik.handleChange}
            placeholder="e.g., Coursera, Udemy, edX"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.by && formik.touched.by && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.by}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Skills <span className="text-red-500">*</span>
          </label>
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
          {formik.errors.skills && formik.touched.skills && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.skills}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Earned At <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="earnedAt"
            value={formik.values.earnedAt.split("T")[0]}
            onChange={formik.handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.earnedAt && formik.touched.earnedAt && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.earnedAt}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Grade <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="grade"
            value={formik.values.grade}
            onChange={formik.handleChange}
            placeholder="e.g., 95%, A+, Distinction"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.grade && formik.touched.grade && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.grade}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Credential URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            name="credential"
            value={formik.values.credential}
            onChange={formik.handleChange}
            placeholder="https://example.com/credential"
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          {formik.errors.credential && formik.touched.credential && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.credential}
            </p>
          )}
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
            Arabic Provider <span className="text-red-500">*</span>
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
            Arabic Skills <span className="text-red-500">*</span>
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
          {formik.errors.translations?.ar?.skills &&
            formik.touched.translations?.ar?.skills && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.translations.ar.skills}
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
            ? "Update Course"
            : "Create Course"}
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
