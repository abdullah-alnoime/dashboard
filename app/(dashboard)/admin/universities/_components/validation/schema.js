import * as Yup from "yup";

export const schema = Yup.object({
  logo: Yup.string()
    .url("Logo must be a valid URI")
    .required("Logo is required"),
  title: Yup.string()
    .min(2, "Title length must be at least 2 characters long")
    .max(100, "Title length must be less than or equal to 100 characters long")
    .required("Title is required"),
  by: Yup.string()
    .min(2, "Provider length must be at least 2 characters long")
    .max(
      100,
      "Provider length must be less than or equal to 100 characters long"
    )
    .required("Provider is required"),
  status: Yup.string()
    .oneOf(
      ["in-progress", "graduated"],
      "Status must be one of in-progress or graduated"
    )
    .required("Status is required"),
  startedAt: Yup.date().when("status", {
    is: "in-progress",
    then: (schema) => schema.required("Started at is required"),
    otherwise: (schema) =>
      schema
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" || originalValue === null ? null : value
        )
        .notRequired(),
  }),
  graduatedAt: Yup.date().when("status", {
    is: "graduated",
    then: (schema) => schema.required("Graduated at is required"),
    otherwise: (schema) =>
      schema
        .nullable()
        .transform((value, originalValue) =>
          originalValue === "" || originalValue === null ? null : value
        )
        .notRequired(),
  }),
  grade: Yup.string().when("status", {
    is: "graduated",
    then: (schema) => schema.required("Grade is required"),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  skills: Yup.array()
    .of(Yup.string().min(1, "Skill cannot be empty"))
    .when("status", {
      is: "graduated",
      then: (schema) =>
        schema
          .min(1, "At least one skill is required for graduated status")
          .required("Skills are required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  translations: Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .min(2, "يجب أن يحتوي العنوان بالعربية على حرفين على الأقل")
        .max(100, "يجب ألا يتجاوز العنوان بالعربية 100 حرف")
        .nullable()
        .optional(),
      by: Yup.string()
        .min(2, "يجب أن يحتوي اسم الجهة بالعربية على حرفين على الأقل")
        .max(100, "يجب ألا يتجاوز اسم الجهة بالعربية 100 حرف")
        .nullable()
        .optional(),
      skills: Yup.array()
        .of(Yup.string().min(1, "يجب ألا تكون المهارة فارغة"))
        .optional(),
    }).optional(),
  }).optional(),
});
