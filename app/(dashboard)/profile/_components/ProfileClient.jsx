"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { changePassword } from "@/requests/auth";
import { schema } from "./validation/schema";

export default function ProfileClient() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
    }
  }, [session, isPending, router]);
  const {
    mutateAsync,
    isPending: passwordPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useMutation({
    mutationFn: (values) => changePassword(values),
    onSuccess: () => setTimeout(() => reset(), 2500),
  });
  const { handleSubmit, getFieldProps, touched, errors, isValid } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      mutateAsync(values);
      resetForm();
    },
  });
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }
  if (!session) return null;
  return (
    <>
      {/* --- Navbar --- */}
      {/* <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="flex items-center gap-4">
            <a href="/" className="text-blue-600 hover:underline">
              Home
            </a>
            <a href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </a>
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact
            </a>
          </div>
        </div>
      </nav> */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <p className="font-medium">{session.user.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-medium">{session.user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Role</label>
              <p className="font-medium capitalize">{session.user.role}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email Verified</label>
              <p className="font-medium">
                {session.user.emailVerified ? (
                  <span className="text-green-600">✓ Yes</span>
                ) : (
                  <span className="text-amber-600">⚠ No</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          {isSuccess && (
            <div className="bg-green-50 text-green-600 p-3 rounded mb-4 flex items-start gap-2">
              <span className="text-xl">✓</span>
              <div>
                <p className="font-medium">Password changed successfully!</p>
                <p className="text-sm">
                  All other sessions have been logged out for security.
                </p>
              </div>
            </div>
          )}
          {isError && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4">
              {error?.message}
            </div>
          )}
          <div className="my-6 p-4 bg-blue-50 rounded text-sm text-blue-800">
            <p className="font-medium mb-1">🔒 Security Note</p>
            <p>
              Changing your password will log you out of all other devices for
              security. You'll need to sign in again on those devices.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                {...getFieldProps("currentPassword")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
                disabled={passwordPending}
              />
              {touched.currentPassword && errors.currentPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                {...getFieldProps("newPassword")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                disabled={passwordPending}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
              {touched.newPassword && errors.newPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                {...getFieldProps("confirmPassword")}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                disabled={passwordPending}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={passwordPending || !isValid}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {passwordPending ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
