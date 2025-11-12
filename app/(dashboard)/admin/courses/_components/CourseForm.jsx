"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import { schema } from "./validation/schema";
import { CourseFormSkeleton } from "./skeleton";
import { NoCourse } from "./courses";
import { useCourse, useUpsertCourse } from "@/hooks/useCourses";
import { DateInput } from "@/components/shared/DatePicker";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const initialCourse = {
  logo: "",
  title: "",
  by: "",
  skills: [],
  earnedAt: "",
  grade: "",
  credential: "",
  translations: {
    ar: {
      title: "",
      by: "",
      skills: [],
    },
  },
};
export default function CourseForm({ mode, courseId }) {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [arSkillInput, setArSkillInput] = useState("");
  const [initialValues, setInitialValues] = useState(initialCourse);
  const { data: course, isLoading, isError, error } = useCourse(courseId);
  const { mutate, isPending } = useUpsertCourse(mode);
  useEffect(() => {
    if (mode === "edit" && course) {
      setInitialValues(course);
    } else if (mode === "create") {
      setInitialValues(initialCourse);
    }
  }, [course, mode]);
  const {
    handleSubmit,
    getFieldProps,
    setFieldValue,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    dirty,
  } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      if (mode === "edit") {
        const { _id, updatedAt, createdAt, __v, ...data } = values;
        mutate(
          { id: courseId, data },
          { onSuccess: () => router.push("/admin/courses") }
        );
      } else {
        mutate(values, { onSuccess: () => router.push("/admin/courses") });
      }
    },
  });
  const handleSkillsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = skillInput.trim();
      if (skill && !values.skills.includes(skill)) {
        setFieldValue("skills", [...values.skills, skill]);
        setSkillInput("");
      }
    }
  };
  const removeSkill = (indexToRemove) => {
    const newSkills = values.skills.filter(
      (_, index) => index !== indexToRemove
    );
    setFieldValue("skills", newSkills);
  };
  const handleArSkillsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const skill = arSkillInput.trim();
      if (skill && !values.translations.ar.skills.includes(skill)) {
        setFieldValue("translations.ar.skills", [
          ...values.translations.ar.skills,
          skill,
        ]);
        setArSkillInput("");
      }
    }
  };
  const removeArSkill = (indexToRemove) => {
    const newSkills = values.translations.ar.skills.filter(
      (_, index) => index !== indexToRemove
    );
    setFieldValue("translations.ar.skills", newSkills);
  };
  if (isLoading) return <CourseFormSkeleton />;
  if (isError) return <NoCourse msg={error.message} />;
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <FieldSet>
        <FieldGroup>
          <FieldLegend>
            {mode === "edit" ? "Update" : "Create a New"} Course
          </FieldLegend>
          <Field data-invalid={!!(errors.logo && touched.logo)}>
            <FieldLabel htmlFor="logo">
              Logo URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="logo"
              placeholder="type logo URL here"
              aria-invalid={!!(errors.logo && touched.logo)}
              {...getFieldProps("logo")}
            />
            {errors.logo && touched.logo && (
              <FieldError>{errors.logo}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.title && touched.title)}>
            <FieldLabel htmlFor="title">
              Title <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="title"
              placeholder="type title here"
              aria-invalid={!!(errors.title && touched.title)}
              {...getFieldProps("title")}
            />
            {errors.title && touched.title && (
              <FieldError>{errors.title}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.by && touched.by)}>
            <FieldLabel htmlFor="by">
              Provider <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="by"
              placeholder="type provider here"
              aria-invalid={!!(errors.by && touched.by)}
              {...getFieldProps("by")}
            />
            {errors.by && touched.by && <FieldError>{errors.by}</FieldError>}
          </Field>
          <Field data-invalid={!!(errors.skills && touched.skills)}>
            <FieldLabel htmlFor="skills">
              Skills <span className="text-red-500"> *</span>
            </FieldLabel>
            <div className="flex gap-1.5 flex-wrap">
              {values.skills?.map((skill, index) => (
                <Badge key={skill} className="ps-3 pe-1 py-1 gap-1">
                  <span>{skill}</span>
                  <Button
                    type="button"
                    onClick={() => removeSkill(index)}
                    disabled={
                      values.status === "in-progress" || values.status === ""
                    }
                    className="w-6 h-6 rounded-full hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-1 h-1" />
                  </Button>
                </Badge>
              ))}
              <Input
                type="text"
                id="skills"
                name="skills"
                value={skillInput}
                className="flex-1 min-w-[200px]"
                onBlur={handleBlur}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => handleSkillsKeyDown(e)}
                aria-invalid={!!(errors.skills && touched.skills)}
                placeholder="type a tool and press Enter"
              />
            </div>
            {touched.skills && errors.skills && (
              <FieldError>{errors.skills}</FieldError>
            )}
          </Field>
          <DateInput
            name="earnedAt"
            label="Earned At"
            setFieldValue={setFieldValue}
            values={values}
            touched={touched}
            errors={errors}
          />
          <Field data-invalid={!!(errors.grade && touched.grade)}>
            <FieldLabel htmlFor="grade">
              Grade
              <span className="text-red-500"> *</span>
            </FieldLabel>
            <Input
              type="text"
              id="grade"
              placeholder="type grade here"
              aria-invalid={!!(errors.grade && touched.grade)}
              {...getFieldProps("grade")}
            />
            {errors.grade && touched.grade && (
              <FieldError>{errors.grade}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.credential && touched.credential)}>
            <FieldLabel htmlFor="credential">
              Credential URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="credential"
              placeholder="type credential URL here"
              aria-invalid={!!(errors.credential && touched.credential)}
              {...getFieldProps("credential")}
            />
            {errors.credential && touched.credential && (
              <FieldError>{errors.credential}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <FieldSet>
        <FieldGroup>
          <FieldLegend className="mt-4" dir="rtl">
            الترجمة العربية
          </FieldLegend>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                errors.translations?.ar?.title &&
                touched.translations?.ar?.title
              )
            }
          >
            <FieldLabel htmlFor="arabicTitle">العنوان</FieldLabel>
            <Input
              type="text"
              id="arabicTitle"
              placeholder="ادخل العنوان هنا"
              {...getFieldProps("translations.ar.title")}
            />
            {errors.translations?.ar?.title &&
              touched.translations?.ar?.title && (
                <FieldError>{errors.translations.ar.title}</FieldError>
              )}
          </Field>
          <Field
            dir="rtl"
            data-invalid={
              !!(errors.translations?.ar?.by && touched.translations?.ar?.by)
            }
          >
            <FieldLabel htmlFor="arabicBy">المعهد/المنصة</FieldLabel>
            <Input
              type="text"
              id="arabicBy"
              placeholder="ادخل اسم المعهد/المنصة هنا"
              {...getFieldProps("translations.ar.by")}
            />
            {errors.translations?.ar?.by && touched.translations?.ar?.by && (
              <FieldError>{errors.translations.ar.by}</FieldError>
            )}
          </Field>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                errors.translations?.ar?.skills &&
                touched.translations?.ar?.skills
              )
            }
          >
            <FieldLabel htmlFor="skills">المهارات</FieldLabel>
            <div className="flex gap-1.5 flex-wrap">
              {values.translations?.ar?.skills?.map((skill, index) => (
                <Badge key={skill} className="pe-3 ps-1 py-1 gap-1">
                  <span>{skill}</span>
                  <Button
                    type="button"
                    onClick={() => removeArSkill(index)}
                    className="w-6 h-6 rounded-full hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="w-1 h-1" />
                  </Button>
                </Badge>
              ))}
              <Input
                type="text"
                id="skills"
                name="skills"
                value={arSkillInput}
                className="flex-1 min-w-[200px]"
                onBlur={handleBlur}
                onChange={(e) => setArSkillInput(e.target.value)}
                onKeyDown={(e) => handleArSkillsKeyDown(e)}
                aria-invalid={
                  !!(
                    errors.translations?.ar?.skills &&
                    touched.translations?.ar?.skills
                  )
                }
                placeholder="ادخل المهارة واضغط Enter"
              />
            </div>
            {touched.translations?.ar?.skills &&
              errors.translations?.ar?.skills && (
                <FieldError>{errors.translations?.ar?.skills}</FieldError>
              )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="mt-6 flex justify-center gap-3">
        <Button
          type="submit"
          disabled={isPending || !isValid || (mode === "edit" && !dirty)}
          className="w-full max-w-sm cursor-pointer"
        >
          {isPending
            ? mode === "edit"
              ? "Updating..."
              : "Creating..."
            : mode === "edit"
            ? "Update Course"
            : "Create Course"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/courses">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
