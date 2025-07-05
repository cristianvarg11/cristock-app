"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

export type SelectOption = {
  value: string;
  label: string;
};

interface AsyncSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  loadOptions: (inputValue: string) => Promise<SelectOption[] | undefined>;
  isClearable?: boolean;
  isDisabled?: boolean;
  required?: boolean;
  className?: string;
}

// Disable SSR completely for react-select
const AsyncSelect = dynamic(
  () =>
    import("react-select/async").then((mod) => {
      // Add workaround for LanguageTool extension
      if (typeof window !== "undefined") {
        document.documentElement.removeAttribute("data-lt-installed");
      }
      return mod.default;
    }),
  {
    ssr: false,
    loading: () => (
      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
        Loading...
      </div>
    ),
  },
);

export const AsyncSelectInput = ({
  name,
  label,
  placeholder = "Search...",
  description,
  loadOptions,
  isClearable = true,
  isDisabled = false,
  required = false,
  className,
}: AsyncSelectProps) => {
  const form = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const loadOptionsWrapper = async (inputValue: string) => {
    const options = await loadOptions(inputValue);
    return options || [];
  };

  if (!isMounted) {
    return (
      <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
        Loading...
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-destructive"> *</span>}
            </FormLabel>
          )}
          <FormControl>
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={loadOptionsWrapper}
              placeholder={placeholder}
              isClearable={isClearable}
              isDisabled={isDisabled}
              classNamePrefix="react-select"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              noOptionsMessage={({ inputValue }) =>
                inputValue ? "No options found" : "Start typing to search..."
              }
              instanceId={name} // Stable IDs for accessibility
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
