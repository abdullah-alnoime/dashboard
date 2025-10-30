import * as Yup from "yup";

export const schema = Yup.object({
  password: Yup.string()
    .min(8, "Must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("confirm password is required"),
});
