"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";

export function DateInput({
  name,
  label,
  disabled,
  values,
  setFieldValue,
  touched,
  errors,
}) {
  const [open, setOpen] = useState(false);
  const selectedDate = values[name] ? new Date(values[name]) : undefined;
  return (
    <Field data-invalid={!!(touched[name] && errors[name])}>
      <Label htmlFor={name}>
        {label} {!disabled && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            className={`justify-between ${
              disabled ? "bg-neutral-100" : "cursor-pointer"
            }`}
            disabled={disabled}
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(date) => {
              setFieldValue(name, date?.toISOString() || "");
              setOpen(false);
            }}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
      {touched[name] && errors[name] && <FieldError>{errors[name]}</FieldError>}
    </Field>
  );
}
