"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateMessage } from "@/hooks/useMessages";
import { schema } from "./validation/schema";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function MessageForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateMessage();
  const { handleSubmit, getFieldProps, values, touched, errors, isValid } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        message: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        mutate(values, { onSuccess: () => router.push("/admin/messages") });
      },
    });
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="p-6 space-y-6 outline shadow-md rounded-lg bg-white"
    >
      <Field data-invalid={!!(errors.name && touched.name)}>
        <FieldLabel htmlFor="name">
          Name <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          type="text"
          id="name"
          placeholder="type name here"
          aria-invalid={!!(errors.name && touched.name)}
          {...getFieldProps("name")}
        />
        {errors.name && touched.name && <FieldError>{errors.name}</FieldError>}
      </Field>
      <Field data-invalid={!!(touched.email && errors.email)}>
        <FieldLabel htmlFor="email">
          Email <span className="text-red-500">*</span>
        </FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="email address"
          {...getFieldProps("email")}
          aria-invalid={!!(touched.email && errors.email)}
        />
        {touched.email && errors.email && (
          <FieldError>{errors.email}</FieldError>
        )}
      </Field>
      <Field data-invalid={!!(errors.message && touched.message)}>
        <FieldLabel htmlFor="message">
          Message <span className="text-red-500">*</span>
        </FieldLabel>
        <Textarea
          id="message"
          placeholder="type message here"
          className="min-h-30 resize-none"
          aria-invalid={!!(errors.message && touched.message)}
          {...getFieldProps("message")}
        />
        <FieldContent className="flex-row justify-between">
          {touched.message && errors.message && (
            <FieldError>{errors.message}</FieldError>
          )}
          <FieldDescription className="ml-auto">
            {values.message.length} / 1000 characters
          </FieldDescription>
        </FieldContent>
      </Field>
      <div className="mt-6 flex justify-center gap-3">
        <Button
          type="submit"
          disabled={isPending || !isValid}
          className="w-full max-w-sm cursor-pointer"
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
        <Button variant="outline" asChild>
          <Link href="/admin/messages">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
