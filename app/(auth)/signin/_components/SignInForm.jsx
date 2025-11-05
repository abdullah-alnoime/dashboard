"use client";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { schema } from "./validation/schema";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSignIn } from "@/hooks/useAuth";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useSignIn();
  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            disabled={isPending}
            aria-invalid={!!(touched.password && errors.password)}
            {...getFieldProps("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 rounded-md cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {touched.password && errors.password && (
          <FieldError>{errors.password}</FieldError>
        )}
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full max-w-md cursor-pointer"
      >
        {isPending ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
