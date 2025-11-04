"use client";

import { useFormik } from "formik";
import Link from "next/link";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useCreateUser } from "@/hooks/useUsers";
import { schema } from "./validation/schema";

export default function UserForm() {
  const createUserMutation = useCreateUser();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      createUserMutation.mutateAsync(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} noValidate className="space-y-4">
      <Field data-invalid={!!(formik.touched.name && formik.errors.name)}>
        <FieldLabel htmlFor="name">
          Name <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="your full name"
          className="bg-white"
          {...formik.getFieldProps("name")}
          aria-invalid={!!(formik.touched.name && formik.errors.name)}
        />
        {formik.touched.name && formik.errors.name && (
          <FieldError id="name-error">{formik.errors.name}</FieldError>
        )}
      </Field>
      <Field data-invalid={!!(formik.touched.email && formik.errors.email)}>
        <FieldLabel htmlFor="email">
          Email <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email address"
          className="bg-white"
          {...formik.getFieldProps("email")}
          aria-invalid={!!(formik.touched.email && formik.errors.email)}
        />
        {formik.touched.email && formik.errors.email && (
          <FieldError id="email-error">{formik.errors.email}</FieldError>
        )}
      </Field>
      <Field
        data-invalid={!!(formik.touched.password && formik.errors.password)}
      >
        <FieldLabel htmlFor="password">
          Password <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="password"
          type="password"
          placeholder="your password"
          className="bg-white"
          {...formik.getFieldProps("password")}
          aria-invalid={!!(formik.touched.password && formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <FieldError id="password-error">{formik.errors.password}</FieldError>
        )}
      </Field>
      <Field data-invalid={!!(formik.touched.role && formik.errors.role)}>
        <FieldLabel htmlFor="role">
          Role <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          value={formik.values.role}
          onValueChange={(value) => {
            formik.setFieldValue("role", value);
          }}
        >
          <SelectTrigger
            id="role"
            className="bg-white"
            aria-invalid={!!(formik.touched.role && formik.errors.role)}
          >
            <SelectValue placeholder="Choose user's role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
        {formik.touched.role && formik.errors.role && (
          <FieldError id="role-error">{formik.errors.role}</FieldError>
        )}
      </Field>
      <div className="flex gap-3 justify-center pt-2">
        <Button
          type="submit"
          disabled={createUserMutation.isPending || !formik.isValid}
          className="flex-1 md:max-w-sm cursor-pointer"
        >
          {createUserMutation.isPending ? "Creating..." : "Create User"}
        </Button>
        <Button variant="secondary" asChild>
          <Link
            href="."
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </Button>
      </div>
    </form>
  );
}
