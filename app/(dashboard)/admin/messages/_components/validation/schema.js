import * as Yup from "yup";

export const schema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(5, "Message must be at least 5 characters")
    .max(1000, "Message must not exceed 1000 characters")
    .required("Message is required"),
});
