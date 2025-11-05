import * as Yup from "yup";

export const schema = Yup.object({
  preview: Yup.string()
    .url("Invalid preview URL")
    .required("Preview URL is required"),
  title: Yup.string()
    .min(2, "At least 2 chars")
    .max(100, "At most 100 chars")
    .required("Title is required"),
  summary: Yup.string()
    .min(5, "At least 5 chars")
    .max(500, "At most 500 chars")
    .required("Summary is required"),
  tools: Yup.array()
    .of(Yup.string().min(1, "Tool cannot be empty"))
    .min(1, "At least one tool is required")
    .required("Tools are required"),
  demo: Yup.string().url("Invalid demo URL").required("Demo URL is required"),
  code: Yup.string().url("Invalid code URL").required("Code URL is required"),
  content: Yup.object({
    description: Yup.string()
      .min(5, "At least 5 chars")
      .max(1000, "At most 1000 chars")
      .required("Description is required"),
    responsive: Yup.object({
      mobile: Yup.string().url("Invalid mobile preview URL"),
      desktop: Yup.string().url("Invalid desktop preview URL"),
    }),
  }).required("Content is required"),
  translations: Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .min(2, "العنوان يجب أن يحتوي على حرفين على الأقل")
        .max(100, "العنوان يجب ألا يتجاوز 100 حرف"),
      summary: Yup.string()
        .min(5, "الملخص يجب أن يحتوي على 5 أحرف على الأقل")
        .max(500, "الملخص يجب ألا يتجاوز 500 حرف"),
      content: Yup.object({
        description: Yup.string()
          .min(5, "الوصف يجب أن يحتوي على 5 أحرف على الأقل")
          .max(1000, "الوصف يجب ألا يتجاوز 1000 حرف"),
      }),
    }),
  }),
});
