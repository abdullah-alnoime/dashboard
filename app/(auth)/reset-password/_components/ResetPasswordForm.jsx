"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { resetPassword } from "@/requests/auth";
import Link from "next/link";
import { schema } from "./validation/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ password, token }) => resetPassword(password, token),
    onSuccess: () => {
      toast.success("Password reset successfully! Please sign in.");
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset password");
    },
  });
  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!token) return;
      mutateAsync({ password: values.password, token });
    },
  });
  if (!token) {
    return (
      <div className="text-center text-sm space-y-2">
        <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
          Invalid or expired reset link. Please request a new one.
        </div>
        <Button>
          <Link href="/forgot-password">Request new reset link</Link>
        </Button>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
      <Field data-invalid={!!(touched.password && errors.password)}>
        <FieldLabel htmlFor="password">New Password</FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="new password"
          disabled={isPending}
          aria-invalid={!!(touched.password && errors.password)}
          {...getFieldProps("password")}
          className={
            errors.password && touched.password ? "border-red-500" : ""
          }
        />
        <FieldError>{errors.password}</FieldError>
      </Field>
      <Field
        data-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
      >
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="confirm new password"
          disabled={isPending}
          aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
          {...getFieldProps("confirmPassword")}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "border-red-500"
              : ""
          }
        />
        <FieldError>{errors.confirmPassword}</FieldError>
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full mt-4"
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
