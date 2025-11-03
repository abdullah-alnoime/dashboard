"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { createUser } from "@/requests/users";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function UserForm() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!isPending) {
      if (!session) {
        toast.warning("Your session is expired!");
        router.push("/signin");
      } else if (session?.user?.role !== "admin") {
        toast.warning("You're not authorized to access this route!");
        router.push("/dashboard");
      }
    }
  }, [session, isPending, router]);
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("The user has been created");
      router.push(".");
    },
    onError: (error) => toast.error(error.message),
  });
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),
    role: Yup.string()
      .oneOf(["user", "admin"], "Invalid role")
      .required("Role is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
    validationSchema,
    onSubmit: (values) => {
      createUserMutation.mutate(values);
    },
  });
  if (isPending)
    return (
      <div className="grid gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-[25px] w-[200px] rounded-full" />
            <Skeleton className="h-[30px] w-full rounded-full" />
          </div>
        ))}
      </div>
    );
  if (session?.user?.role !== "admin") return null;
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
