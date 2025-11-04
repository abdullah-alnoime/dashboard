"use client";

import { useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
import { schema } from "./validation/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useResetPassword } from "@/hooks/useAuth";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const { mutateAsync, isPending } = useResetPassword();
  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!token) return;
      const { confirmPassword, password } = values;
      await mutateAsync({ password, token });
    },
  });
  const togglePassword = (key) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <FieldLabel htmlFor="password">New password</FieldLabel>
        <div className="relative">
          <Input
            id="password"
            type={showPassword.new ? "text" : "password"}
            placeholder="new password"
            disabled={isPending}
            aria-invalid={!!(touched.password && errors.password)}
            {...getFieldProps("password")}
          />
          <button
            type="button"
            onClick={() => togglePassword("new")}
            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 rounded-md cursor-pointer"
          >
            {showPassword.new ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <FieldError>{errors.password}</FieldError>
        )}
      </Field>
      <Field
        data-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
      >
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="confirm new password"
            disabled={isPending}
            aria-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
            {...getFieldProps("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => togglePassword("confirm")}
            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 rounded-md cursor-pointer"
          >
            {showPassword.confirm ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && touched.confirmPassword && (
          <FieldError>{errors.confirmPassword}</FieldError>
        )}
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full max-w-md cursor-pointer"
      >
        {isPending ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
}
