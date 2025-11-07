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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useCreateUser();
  const {
    handleSubmit,
    getFieldProps,
    setFieldValue,
    values,
    touched: { name: tName, email: tEmail, password: tPassword, role: tRole },
    errors: { name: eName, email: eEmail, password: ePassword, role: eRole },
    isValid,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema: schema,
    onSubmit: (values) => mutate(values),
  });
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <Field data-invalid={!!(tName && eName)}>
        <FieldLabel htmlFor="name">
          Name <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="your full name"
          {...getFieldProps("name")}
          aria-invalid={!!(tName && eName)}
        />
        {tName && eName && <FieldError>{eName}</FieldError>}
      </Field>
      <Field data-invalid={!!(tEmail && eEmail)}>
        <FieldLabel htmlFor="email">
          Email <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email address"
          {...getFieldProps("email")}
          aria-invalid={!!(tEmail && eEmail)}
        />
        {tEmail && eEmail && <FieldError>{eEmail}</FieldError>}
      </Field>
      <Field data-invalid={!!(tPassword && ePassword)}>
        <FieldLabel htmlFor="password">
          Password <span className="text-red-500">*</span>
        </FieldLabel>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="your password"
            {...getFieldProps("password")}
            aria-invalid={!!(tPassword && ePassword)}
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
        {tPassword && ePassword && <FieldError>{ePassword}</FieldError>}
      </Field>
      <Field data-invalid={!!(tRole && eRole)}>
        <FieldLabel htmlFor="role">
          Role <span className="text-red-500">*</span>
        </FieldLabel>
        <Select
          value={values.role}
          onValueChange={(value) => {
            setFieldValue("role", value);
          }}
        >
          <SelectTrigger
            id="role"
            className="cursor-pointer"
            aria-invalid={!!(tRole && eRole)}
          >
            <SelectValue placeholder="Choose user's role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user" className="cursor-pointer">
              User
            </SelectItem>
            <SelectItem value="admin" className="cursor-pointer">
              Admin
            </SelectItem>
          </SelectContent>
        </Select>
        {tRole && eRole && <FieldError>{eRole}</FieldError>}
      </Field>
      <div className="flex gap-3 justify-center pt-2">
        <Button
          type="submit"
          disabled={isPending || !isValid}
          className="flex-1 md:max-w-sm cursor-pointer"
        >
          {isPending ? "Creating..." : "Create User"}
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
