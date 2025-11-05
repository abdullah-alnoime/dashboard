"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
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

export default function ProjectForm({ mode, projectId }) {
  const [toolInput, setToolInput] = useState("");
  const { data: project = [], isLoading } = useProject(projectId);
  const mutation = useUpsertProject(mode);
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
    // validationSchema: schema,
    onSubmit: (values) => {
      if (mode === "edit") {
        const { _id, updatedAt, createdAt, __v, ...data } = values;
        mutation.mutate({ id: projectId, data });
      } else {
        mutation.mutate(values);
      }
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
    return <div>loading fields..</div>;
  }
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
      <FieldSet>
        <FieldGroup>
          <Field
            data-invalid={!!(formik.errors.preview && formik.touched.preview)}
          >
            <FieldLabel htmlFor="preview">
              Preview URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="preview"
              placeholder="type preview URL here"
              className="bg-white"
              aria-invalid={!!(formik.errors.preview && formik.touched.preview)}
              {...formik.getFieldProps("preview")}
            />
            {formik.errors.preview && formik.touched.preview && (
              <FieldError>{formik.errors.preview}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(formik.errors.title && formik.touched.title)}>
            <FieldLabel htmlFor="title">
              Title <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="text"
              id="title"
              placeholder="type title here"
              className="bg-white"
              aria-invalid={!!(formik.errors.title && formik.touched.title)}
              {...formik.getFieldProps("title")}
            />
            {formik.errors.title && formik.touched.title && (
              <FieldError>{formik.errors.title}</FieldError>
            )}
          </Field>
          <Field
            data-invalid={!!(formik.errors.summary && formik.touched.summary)}
          >
            <FieldLabel htmlFor="summary">
              Summary <span className="text-red-500">*</span>
            </FieldLabel>
            <Textarea
              id="summary"
              placeholder="type summary here"
              className="min-h-24 bg-white resize-none"
              aria-invalid={!!(formik.errors.summary && formik.touched.summary)}
              {...formik.getFieldProps("summary")}
            />
            {formik.errors.summary && formik.touched.summary && (
              <FieldError>{formik.errors.summary}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(formik.errors.tools && formik.touched.tools)}>
            <FieldLabel htmlFor="tools">
              Tools <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="flex gap-1.5 flex-wrap">
              {formik.values.tools.map((tool, index) => (
                <Badge key={tool} className="ps-3 pe-1 py-1 gap-1">
                  <span>{tool}</span>
                  <Button
                    type="button"
                    onClick={() => removeTool(index)}
                    className="w-6 h-6 rounded-full hover:text-neutral-900 hover:bg-neutral-100"
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
                className="bg-white flex-1 min-w-[200px]"
                onChange={(e) => setToolInput(e.target.value)}
                onBlur={formik.handleBlur}
                onKeyDown={handleToolsKeyDown}
                aria-invalid={!!(formik.errors.tools && formik.touched.tools)}
                placeholder="type a tool and press Enter"
              />
            </div>
            {formik.touched.tools && formik.errors.tools && (
              <FieldError>{formik.errors.tools}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(formik.errors.demo && formik.touched.demo)}>
            <FieldLabel htmlFor="demo">
              Demo URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="demo"
              placeholder="type demo URL here"
              className="bg-white"
              aria-invalid={!!(formik.errors.demo && formik.touched.demo)}
              {...formik.getFieldProps("demo")}
            />
            {formik.touched.demo && formik.errors.demo && (
              <FieldError>{formik.errors.demo}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!(formik.errors.code && formik.touched.code)}>
            <FieldLabel htmlFor="code">
              Code URL <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              type="url"
              id="code"
              placeholder="type code URL here"
              className="bg-white"
              aria-invalid={!!(formik.errors.code && formik.touched.code)}
              {...formik.getFieldProps("code")}
            />
            {formik.touched.code && formik.errors.code && (
              <FieldError>{formik.errors.code}</FieldError>
            )}
          </Field>
          <Field
            data-invalid={
              !!(
                formik.errors.content?.description &&
                formik.touched.content?.description
              )
            }
          >
            <FieldLabel htmlFor="description">
              Description <span className="text-red-500">*</span>
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="type description here"
              className="min-h-30 bg-white resize-none"
              aria-invalid={
                !!(
                  formik.errors.content?.description &&
                  formik.touched.content?.description
                )
              }
              {...formik.getFieldProps("content.description")}
            />
            {formik.touched.content?.description &&
              formik.errors.content?.description && (
                <FieldError>{formik.errors.content.description}</FieldError>
              )}
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field
              data-invalid={
                !!(
                  formik.touched.content?.responsive?.mobile &&
                  formik.errors.content?.responsive?.mobile
                )
              }
            >
              <FieldLabel htmlFor="mobile">Mobile preview URL</FieldLabel>
              <Input
                type="url"
                id="mobile"
                className="bg-white"
                placeholder="type mobile preview URL here"
                aria-invalid={
                  !!(
                    formik.touched.content?.responsive?.mobile &&
                    formik.errors.content?.responsive?.mobile
                  )
                }
                {...formik.getFieldProps("content.responsive.mobile")}
              />
              {formik.touched.content?.responsive?.mobile &&
                formik.errors.content?.responsive?.mobile && (
                  <FieldError>
                    {formik.errors.content.responsive.mobile}
                  </FieldError>
                )}
            </Field>
            <Field
              data-invalid={
                !!(
                  formik.touched.content?.responsive?.desktop &&
                  formik.errors.content?.responsive?.desktop
                )
              }
            >
              <FieldLabel htmlFor="desktop">Desktop preview URL</FieldLabel>
              <Input
                type="url"
                id="desktop"
                placeholder="type desktop preview URL here"
                aria-invalid={
                  !!(
                    formik.touched.content?.responsive?.desktop &&
                    formik.errors.content?.responsive?.desktop
                  )
                }
                {...formik.getFieldProps("content.responsive.desktop")}
              />
              {formik.touched.content?.responsive?.desktop &&
                formik.errors.content?.responsive?.desktop && (
                  <FieldError>
                    {formik.errors.content.responsive.desktop}
                  </FieldError>
                )}
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
      <FieldSeparator></FieldSeparator>
      <FieldSet>
        <FieldGroup>
          <FieldLegend className="mt-4" dir="rtl">
            الترجمة العربية
          </FieldLegend>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                formik.errors.translations?.ar?.title &&
                formik.touched.translations?.ar?.title
              )
            }
          >
            <FieldLabel htmlFor="arabicTitle">العنوان</FieldLabel>
            <Input
              type="text"
              id="arabicTitle"
              placeholder="ادخل العنوان هنا"
              className="bg-white"
              aria-invalid={
                !!(
                  formik.errors.translations?.ar?.title &&
                  formik.touched.translations?.ar?.title
                )
              }
              {...formik.getFieldProps("translations.ar.title")}
            />
            {formik.errors.translations?.ar?.title &&
              formik.touched.translations?.ar?.title && (
                <FieldError>{formik.errors.translations?.ar?.title}</FieldError>
              )}
          </Field>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                formik.errors.translations?.ar?.summary &&
                formik.touched.translations?.ar?.summary
              )
            }
          >
            <FieldLabel htmlFor="arabicSummary">الملخص</FieldLabel>
            <Textarea
              id="arabicSummary"
              placeholder="ادخل النص هنا"
              className="min-h-24 bg-white resize-none"
              aria-invalid={
                !!(
                  formik.errors.translations?.ar?.summary &&
                  formik.touched.translations?.ar?.summary
                )
              }
              {...formik.getFieldProps("translations.ar.summary")}
            />
            {formik.errors.translations?.ar?.summary &&
              formik.touched.translations?.ar?.summary && (
                <FieldError>
                  {formik.errors.translations?.ar?.summary}
                </FieldError>
              )}
          </Field>
          <Field
            dir="rtl"
            data-invalid={
              !!(
                formik.errors.translations?.ar?.content?.description &&
                formik.touched.translations?.ar?.content?.description
              )
            }
          >
            <FieldLabel htmlFor="arabicDescription">الوصف</FieldLabel>
            <Textarea
              id="arabicDescription"
              placeholder="ادخل النص هنا"
              className="min-h-30 bg-white resize-none"
              aria-invalid={
                !!(
                  formik.errors.translations?.ar?.content?.description &&
                  formik.touched.translations?.ar?.content?.description
                )
              }
              {...formik.getFieldProps("translations.ar.content.description")}
            />
            {formik.errors.translations?.ar?.content?.description &&
              formik.touched.translations?.ar?.content?.description && (
                <FieldError>
                  {formik.errors.translations?.ar?.content?.description}
                </FieldError>
              )}
          </Field>
        </FieldGroup>
      </FieldSet>
      <div className="mt-6 flex justify-center gap-3">
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full max-w-md cursor-pointer"
        >
          {mutation.isPending
            ? `${mode === "edit" ? "Updating..." : "Creating..."}`
            : mode === "edit"
            ? "Update Project"
            : "Create Project"}
        </Button>
        <Button variant="outline" asChild>
          <Link href=".">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
