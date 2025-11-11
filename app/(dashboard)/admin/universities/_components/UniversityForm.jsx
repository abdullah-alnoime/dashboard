"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import { schema } from "./validation/schema";
import { useUniversity, useUpsertUniversity } from "@/hooks/useUniversities";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateInput } from "./form/DatePicker";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const initialUniversity = {
  logo: "",
  title: "",
  by: "",
  status: "in-progress",
  startedAt: "",
  graduatedAt: "",
  grade: "",
  skills: [],
  translations: {
    ar: {
      title: "",
      by: "",
      skills: [],
    },
  },
};

export default function UniversityForm({ mode, universityId }) {
  const router = useRouter();
  const [skillInput, setSkillInput] = useState("");
  const [arSkillInput, setArSkillInput] = useState("");
  const [initialValues, setInitialValues] = useState(initialUniversity);
  const {
    data: university,
    isLoading,
    isError,
    error,
  } = useUniversity(universityId);
  const { mutate, isPending } = useUpsertUniversity(mode);
  useEffect(() => {
    if (mode === "edit" && university) {
      setInitialValues(university);
    } else if (mode === "create") {
      setInitialValues(initialUniversity);
    }
  }, [university, mode]);
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
        const { _id, updatedAt, createdAt, __v, ...rest } = values;
        let data =
          rest.status === "in-progress"
            ? { ...rest, graduatedAt: "", grade: "", skills: [] }
            : { ...rest, startedAt: "" };
        mutate(
          { id: universityId, data },
          { onSuccess: () => router.push("/admin/universities") }
        );
      } else {
        mutate(values, { onSuccess: () => router.push("/admin/universities") });
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
  if (isLoading) return <div>Loading university data...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <FieldSet>
        <FieldGroup>
          <FieldLegend>
            {mode === "edit" ? "Update" : "Create a New"} University
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
              Institution <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="by"
              placeholder="type institution here"
              aria-invalid={!!(errors.by && touched.by)}
              {...getFieldProps("by")}
            />
            {errors.by && touched.by && <FieldError>{errors.by}</FieldError>}
          </Field>
          <Field data-invalid={!!(touched.status && errors.status)}>
            <FieldLabel htmlFor="status">
              Status <span className="text-red-500">*</span>
            </FieldLabel>
            <Select
              value={values.status}
              onValueChange={(value) => {
                console.log(value);
                setFieldValue("status", value || university?.status);
              }}
            >
              <SelectTrigger
                id="status"
                className="cursor-pointer"
                aria-invalid={!!(touched.status && errors.status)}
              >
                <SelectValue placeholder="Choose current status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in-progress" className="cursor-pointer">
                  In Progress
                </SelectItem>
                <SelectItem value="graduated" className="cursor-pointer">
                  Graduated
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.status && touched.status && (
              <FieldError>{errors.status}</FieldError>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <DateInput
              name="startedAt"
              label="Started At"
              disabled={values.status === "graduated" || values.status === ""}
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
            />
            <DateInput
              name="graduatedAt"
              label="Graduated At"
              disabled={values.status === "in-progress" || values.status === ""}
              setFieldValue={setFieldValue}
              values={values}
              touched={touched}
              errors={errors}
            />
          </div>
          <Field data-invalid={!!(errors.grade && touched.grade)}>
            <FieldLabel htmlFor="grade">
              Grade{" "}
              {values.status === "graduated" && (
                <span className="text-red-500"> *</span>
              )}
            </FieldLabel>
            <Input
              type="text"
              id="grade"
              placeholder="type grade here"
              className={
                values.status === "in-progress"
                  ? "bg-neutral-100 placeholder:font-medium placeholder:text-gray-900"
                  : null
              }
              disabled={values.status === "in-progress" || values.status === ""}
              aria-invalid={!!(errors.grade && touched.grade)}
              {...getFieldProps("grade")}
            />
            {errors.grade && touched.grade && (
              <FieldError>{errors.grade}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.skills && touched.skills)}>
            <FieldLabel htmlFor="skills">
              Skills{" "}
              {values.status === "graduated" && (
                <span className="text-red-500"> *</span>
              )}
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
                disabled={
                  values.status === "in-progress" || values.status === ""
                }
                className={`flex-1 min-w-[200px] ${
                  values.status === "in-progress"
                    ? "bg-neutral-100 placeholder:font-medium placeholder:text-gray-900"
                    : null
                }`}
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
            <FieldLabel htmlFor="arabicBy">العنوان</FieldLabel>
            <Input
              type="text"
              id="arabicBy"
              placeholder="ادخل اسم المعهد/الجامعة هنا"
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
            ? "Update University"
            : "Create University"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/universities">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
