"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { signup } from "@/requests/auth";
import { schema } from "./validation/schema";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignUpForm() {
  const router = useRouter();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success(
        "Account created! Please check your email to verify your account before signing in."
      );
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign up");
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      const { confirmPassword, ...data } = values;
      mutateAsync(data);
    },
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <Field data-invalid={!!(touched.name && errors.name)}>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="your full name"
          disabled={isPending}
          aria-invalid={!!(touched.name && errors.name)}
          {...getFieldProps("name")}
        />
        {touched.name && errors.name && <FieldError>{errors.name}</FieldError>}
      </Field>
      <Field data-invalid={!!(touched.email && errors.email)}>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email address"
          disabled={isPending}
          aria-invalid={!!(touched.email && errors.email)}
          {...getFieldProps("email")}
        />
        {touched.email && errors.email && (
          <FieldError>{errors.email}</FieldError>
        )}
      </Field>
      <Field data-invalid={!!(touched.password && errors.password)}>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="password"
          disabled={isPending}
          aria-invalid={!!(touched.password && errors.password)}
          {...getFieldProps("password")}
        />
        {touched.password && errors.password && (
          <FieldError>{errors.password}</FieldError>
        )}
      </Field>
      <Field
        data-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
      >
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="confirm password"
          disabled={isPending}
          aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
          {...getFieldProps("confirmPassword")}
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <FieldError>{errors.confirmPassword}</FieldError>
        )}
      </Field>
      <Button type="submit" disabled={isPending || !isValid} className="w-full">
        {isPending ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
