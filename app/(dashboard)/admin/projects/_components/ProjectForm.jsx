"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProject, useUpsertProject } from "@/hooks/useProjects";
import { schema } from "./validation/schema";
import { ProjectFormSkeleton } from "./skeleton";
import { NoProject } from "./projects";
import { useRouter } from "next/navigation";

const initialProject = {
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
};

export default function ProjectForm({ mode, projectId }) {
  const router = useRouter();
  const [toolInput, setToolInput] = useState("");
  const [initialValues, setInitialValues] = useState(initialProject);
  const { data: project, isError, error, isLoading } = useProject(projectId);
  const { mutate, isPending } = useUpsertProject(mode);
  useEffect(() => {
    if (mode === "edit" && project) {
      setInitialValues(project);
    } else if (mode === "create") {
      setInitialValues(initialProject);
    }
  }, [project, mode]);
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
          { id: projectId, data },
          { onSuccess: () => router.push("/admin/projects") }
        );
      } else {
        mutate(values, { onSuccess: () => router.push("/admin/projects") });
      }
    },
  });
  const handleToolsKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tool = toolInput.trim();
      if (tool && !values.tools.includes(tool)) {
        setFieldValue("tools", [...values.tools, tool]);
        setToolInput("");
      }
    }
  };
  const removeTool = (indexToRemove) => {
    const newTools = values.tools.filter((_, index) => index !== indexToRemove);
    setFieldValue("tools", newTools);
  };
  if (isLoading) return <ProjectFormSkeleton />;
  if (isError) return <NoProject msg={error.message} />;
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <FieldSet>
        <FieldGroup>
          <FieldLegend>
            {mode === "edit" ? "Update" : "Create a New"} Project
          </FieldLegend>
          <Field data-invalid={!!(errors.preview && touched.preview)}>
            <FieldLabel htmlFor="preview">
              Preview URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="preview"
              placeholder="type preview URL here"
              aria-invalid={!!(errors.preview && touched.preview)}
              {...getFieldProps("preview")}
            />
            {errors.preview && touched.preview && (
              <FieldError>{errors.preview}</FieldError>
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
          <Field data-invalid={!!(errors.summary && touched.summary)}>
            <FieldLabel htmlFor="summary">
              Summary <span className="text-red-500">*</span>
            </FieldLabel>
            <Textarea
              id="summary"
              placeholder="type summary here"
              className="min-h-24 resize-none"
              aria-invalid={!!(errors.summary && touched.summary)}
              {...getFieldProps("summary")}
            />
            {errors.summary && touched.summary && (
              <FieldError>{errors.summary}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.tools && touched.tools)}>
            <FieldLabel htmlFor="tools">
              Tools <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="flex gap-1.5 flex-wrap">
              {values.tools?.map((tool, index) => (
                <Badge key={tool} className="ps-3 pe-1 py-1 gap-1">
                  <span>{tool}</span>
                  <Button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="w-6 h-6 rounded-full hover:text-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    aria-label={`Remove ${tool}`}
                  >
                    <X className="w-1 h-1" />
                  </Button>
                </Badge>
              ))}
              <Input
                type="text"
                id="tools"
                name="tools"
                value={toolInput}
                className="flex-1 min-w-[200px]"
                onChange={(e) => setToolInput(e.target.value)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleToolsKeyDown(e)}
                aria-invalid={!!(errors.tools && touched.tools)}
                placeholder="type a tool and press Enter"
              />
            </div>
            {touched.tools && errors.tools && (
              <FieldError>{errors.tools}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.demo && touched.demo)}>
            <FieldLabel htmlFor="demo">
              Demo URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="demo"
              placeholder="type demo URL here"
              aria-invalid={!!(errors.demo && touched.demo)}
              {...getFieldProps("demo")}
            />
            {touched.demo && errors.demo && (
              <FieldError>{errors.demo}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(errors.code && touched.code)}>
            <FieldLabel htmlFor="code">
              Code URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="code"
              placeholder="type code URL here"
              aria-invalid={!!(errors.code && touched.code)}
              {...getFieldProps("code")}
            />
            {touched.code && errors.code && (
              <FieldError>{errors.code}</FieldError>
            )}
          </Field>
          <Field
            data-invalid={
              !!(errors.content?.description && touched.content?.description)
            }
          >
            <FieldLabel htmlFor="description">
              Description <span className="text-red-500">*</span>
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="type description here"
              className="min-h-30 resize-none"
              aria-invalid={
                !!(errors.content?.description && touched.content?.description)
              }
              {...getFieldProps("content.description")}
            />
            {touched.content?.description && errors.content?.description && (
              <FieldError>{errors.content.description}</FieldError>
            )}
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field
              data-invalid={
                !!(
                  errors.content?.responsive?.mobile &&
                  touched.content?.responsive?.mobile
                )
              }
            >
              <FieldLabel htmlFor="mobile">Mobile preview URL</FieldLabel>
              <Input
                type="url"
                id="mobile"
                placeholder="type mobile preview URL here"
                {...getFieldProps("content.responsive.mobile")}
              />
              {touched.content?.responsive?.mobile &&
                errors.content?.responsive?.mobile && (
                  <FieldError>{errors.content.responsive.mobile}</FieldError>
                )}
            </Field>
            <Field
              data-invalid={
                !!(
                  errors.content?.responsive?.desktop &&
                  touched.content?.responsive?.desktop
                )
              }
            >
              <FieldLabel htmlFor="desktop">Desktop preview URL</FieldLabel>
              <Input
                type="url"
                id="desktop"
                placeholder="type desktop preview URL here"
                {...getFieldProps("content.responsive.desktop")}
              />
              {touched.content?.responsive?.desktop &&
                errors.content?.responsive?.desktop && (
                  <FieldError>{errors.content.responsive.desktop}</FieldError>
                )}
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator />
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
              !!(
                errors.translations?.ar?.summary &&
                touched.translations?.ar?.summary
              )
            }
          >
            <FieldLabel htmlFor="arabicSummary">الملخص</FieldLabel>
            <Textarea
              id="arabicSummary"
              placeholder="ادخل النص هنا"
              className="min-h-24 resize-none"
              {...getFieldProps("translations.ar.summary")}
            />
            {errors.translations?.ar?.summary &&
              touched.translations?.ar?.summary && (
                <FieldError>{errors.translations.ar.summary}</FieldError>
              )}
          </Field>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                errors.translations?.ar?.content?.description &&
                touched.translations?.ar?.content?.description
              )
            }
          >
            <FieldLabel htmlFor="arabicDescription">الوصف</FieldLabel>
            <Textarea
              id="arabicDescription"
              placeholder="ادخل النص هنا"
              className="min-h-30 resize-none"
              {...getFieldProps("translations.ar.content.description")}
            />
            {errors.translations?.ar?.content?.description &&
              touched.translations?.ar?.content?.description && (
                <FieldError>
                  {errors.translations.ar.content.description}
                </FieldError>
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
            ? "Update Project"
            : "Create Project"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/projects">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
