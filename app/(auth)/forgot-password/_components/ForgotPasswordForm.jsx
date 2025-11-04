"use client";

import { useFormik } from "formik";
import { schema } from "./validation/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordForm() {
  const { mutateAsync, isPending } = useForgotPassword();
  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      await mutateAsync(values.email);
    },
  });
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <Field data-invalid={!!(touched.password && errors.password)}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="your.email@example.com"
          disabled={isPending}
          aria-invalid={!!(touched.email && errors.email)}
          {...getFieldProps("email")}
          className={errors.email && touched.email ? "border-red-500" : ""}
        />
        {errors.email && touched.email && (
          <FieldError>{errors.email}</FieldError>
        )}
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full max-w-md cursor-pointer"
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
