import * as Yup from "yup";

export const schema = Yup.object().shape({
  logo: Yup.string()
    .url("Logo must be a valid URI")
    .required("Logo is required"),
  title: Yup.string()
    .min(2, "Title length must be at least 2 characters long")
    .max(200, "Title length must be less than or equal to 200 characters long")
    .required("Title is required"),
  by: Yup.string()
    .min(2, "Provider length must be at least 2 characters long")
    .max(
      200,
      "Provider length must be less than or equal to 200 characters long"
    )
    .required("Provider is required"),
  skills: Yup.array()
    .of(
      Yup.string()
        .min(1, "Each skill must have at least 1 character")
        .required("Skill cannot be empty")
    )
    .min(1, "Skills must contain at least 1 item")
    .required("Skills are required"),
  earnedAt: Yup.date()
    .typeError("Earned at must be a valid date")
    .required("Earned at is required"),
  grade: Yup.string()
    .min(1, "Grade length must be at least 1 character long")
    .max(100, "Grade length must be less than or equal to 100 characters long")
    .required("Grade is required"),
  credential: Yup.string()
    .url("Credential link must be a valid URI")
    .required("Credential link is required"),
  translations: Yup.object()
    .shape({
      ar: Yup.object()
        .shape({
          title: Yup.string()
            .min(2, "عنوان الدورة باللغة العربية يجب أن لا يقل عن حرفين")
            .max(200, "عنوان الدورة باللغة العربية يجب أن لا يتجاوز 200 حرف")
            .optional()
            .nullable(),
          by: Yup.string()
            .min(2, "اسم الجهة المانحة بالعربية يجب أن لا يقل عن حرفين")
            .max(200, "اسم الجهة المانحة بالعربية يجب أن لا يتجاوز 200 حرف")
            .optional()
            .nullable(),
          skills: Yup.array()
            .of(Yup.string().optional())
            .optional()
            .nullable()
            .typeError("المهارات باللغة العربية يجب أن تكون قائمة من النصوص"),
        })
        .optional(),
    })
    .optional(),
});
