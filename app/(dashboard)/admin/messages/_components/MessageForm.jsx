"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { createMessage } from "@/requests/messages";
import Link from "next/link";

export default function MessageForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => createMessage(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
      alert(`Message sent successfully!`);
      router.back();
    },
    onError: (error) => {
      alert(error.response?.data?.msg || "Failed to send message");
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must not exceed 50 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string()
        .min(5, "Message must be at least 5 characters")
        .max(1000, "Message must not exceed 1000 characters")
        .required("Message is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Your name"
        />
        {formik.errors.name && formik.touched.name && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="your.email@example.com"
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          rows="6"
          placeholder="Your message..."
        />
        <p className="text-sm text-gray-500 mt-1">
          {formik.values.message.length} / 1000 characters
        </p>
        {formik.errors.message && formik.touched.message && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
        )}
      </div>
      <div className="pt-6 flex gap-3">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {mutation.isPending ? "Sending..." : "Send Message"}
        </button>
        <Link
          href="."
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
