"use client";

import { useFormik } from "formik";
import { schema } from "./validation/schema";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useSignUp } from "@/hooks/useAuth";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const { mutateAsync, isPending } = useSignUp();
  const { handleSubmit, getFieldProps, errors, touched, isValid } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const { confirmPassword, ...data } = values;
      await mutateAsync(data);
    },
  });
  const togglePassword = (key) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
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
        <div className="relative">
          <Input
            id="password"
            type={showPassword.password ? "text" : "password"}
            placeholder="password"
            disabled={isPending}
            aria-invalid={!!(touched.password && errors.password)}
            {...getFieldProps("password")}
          />
          <button
            type="button"
            onClick={() => togglePassword("password")}
            className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 rounded-md cursor-pointer"
          >
            {showPassword.password ? (
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
      <Field
        data-invalid={!!(touched.confirmPassword && errors.confirmPassword)}
      >
        <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showPassword.confirm ? "text" : "password"}
            placeholder="confirm password"
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
        {touched.confirmPassword && errors.confirmPassword && (
          <FieldError>{errors.confirmPassword}</FieldError>
        )}
      </Field>
      <Button
        type="submit"
        disabled={isPending || !isValid}
        className="w-full max-w-md cursor-pointer"
      >
        {isPending ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
