"use client";

import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/requests/auth";
import { schema } from "./validation/schema";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldSet,
  FieldGroup,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (email) => forgotPassword(email),
    onSuccess: () => {
      toast.success("Password reset link sent! Check your email.");
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send reset link");
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      mutateAsync(values.email);
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
        <FieldError>{errors.email} </FieldError>
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full mt-4"
      >
        {isPending ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
