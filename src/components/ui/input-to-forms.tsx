import { Control, FieldValues, Path } from "react-hook-form";
import React from "react";

import { Input } from "./input";
import {
  FormDescription,
  FormControl,
  FormMessage,
  FormLabel,
  FormField,
  FormItem,
} from "./form";

interface CustomInputProps<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: string;
  control: Control<T>;
  label?: string;
  name: Path<T>;
}

export const InputForm = <T extends FieldValues>({
  description,
  control,
  label,
  name,
  ...props
}: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
