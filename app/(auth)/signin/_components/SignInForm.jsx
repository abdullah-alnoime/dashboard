"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { schema } from "./validation/schema";
import { signin } from "@/requests/auth";
import { useFormik } from "formik";
import { toast } from "sonner";
import Link from "next/link";

export default function SignInForm() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values) => signin(values),
    onSuccess: () => {
      toast.success("You gain access to dashboard!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign in");
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: (values) => mutateAsync(values),
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
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
        <div className="flex justify-between items-center">
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
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
      <Button type="submit" disabled={isPending || !isValid} className="w-full">
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
