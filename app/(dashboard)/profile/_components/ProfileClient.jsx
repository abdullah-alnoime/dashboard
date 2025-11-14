"use client";

import { useFormik } from "formik";
import { schema } from "./validation/schema";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { usePermissions } from "@/hooks/usePermissions";
import { useChangePassword } from "@/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProfileClient() {
  const { session } = usePermissions();
  const { mutate, isPending } = useChangePassword();
  const { handleSubmit, getFieldProps, touched, errors, isValid } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const { confirmPassword, ...data } = values;
      mutate(data, { onSuccess: () => resetForm() });
    },
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const togglePassword = (key) =>
    setShowPassword((prev) => ({ ...prev, [key]: !prev[key] }));
  return (
    <main className="min-h-screen bg-gray-50">
      <ProtectedRoute>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-row items-center justify-between mb-4">
              <div className="flex gap-2 items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      asChild
                    >
                      <Link href="/">
                        <ChevronLeft />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Back to Homepage</p>
                  </TooltipContent>
                </Tooltip>
                <h2 className="text-lg font-semibold">Account Information</h2>
              </div>
              <Button variant="ghost" className="cursor-pointer" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle className="text-lg font-bold">Name</ItemTitle>
                  <ItemDescription>{session?.user.name}</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle className="text-lg font-bold">Email</ItemTitle>
                  <ItemDescription>{session?.user.email}</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle className="text-lg font-bold">Role</ItemTitle>
                  <ItemDescription>{session?.user.role}</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle className="text-lg font-bold">
                    Email Verified
                  </ItemTitle>
                  <ItemDescription>
                    {session?.user.emailVerified ? "Verified" : "Not Verified"}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Field
                data-invalid={
                  !!(touched.currentPassword && errors.currentPassword)
                }
              >
                <FieldLabel htmlFor="currentPassword">
                  Current password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword.current ? "text" : "password"}
                    placeholder="current password"
                    disabled={isPending}
                    aria-invalid={
                      !!(touched.currentPassword && errors.currentPassword)
                    }
                    {...getFieldProps("currentPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => togglePassword("current")}
                    className="absolute right-0 inset-y-0 px-3 flex items-center text-gray-500 rounded-md cursor-pointer"
                  >
                    {showPassword.current ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {touched.currentPassword && errors.currentPassword && (
                  <FieldError>{errors.currentPassword}</FieldError>
                )}
              </Field>
              <Field
                data-invalid={!!(touched.newPassword && errors.newPassword)}
              >
                <FieldLabel htmlFor="newPassword">New password</FieldLabel>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword.new ? "text" : "password"}
                    placeholder="new password"
                    disabled={isPending}
                    aria-invalid={!!(touched.newPassword && errors.newPassword)}
                    {...getFieldProps("newPassword")}
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
                {touched.newPassword && errors.newPassword && (
                  <FieldError>{errors.newPassword}</FieldError>
                )}
              </Field>
              <Field
                data-invalid={
                  !!(touched.confirmPassword && errors.confirmPassword)
                }
              >
                <FieldLabel htmlFor="confirmPassword">
                  Confirm password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="confirm new password"
                    disabled={isPending}
                    aria-invalid={
                      !!(touched.confirmPassword && errors.confirmPassword)
                    }
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
                className="w-full lg:max-w-md mx-auto"
              >
                {isPending ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </div>
        </div>
      </ProtectedRoute>
    </main>
  );
}
