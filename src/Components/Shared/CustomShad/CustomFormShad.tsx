import React from "react";
import { Input } from "../../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { ChangeHandler, Control } from "react-hook-form";
import { formSchema } from "../TransformationForm";
import { z } from "zod";

export type ShadCnFormProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  name: "title" | "aspectRatio" | "color" | "promt" | "publicId";
  title?: string;
  description?: string;
  selectElements?: string[];
  placeholder?: string;
  type?: string;
  onChangeFunc?:
    | ((
        fieldName: string,
        value: string,
        type: string,
        onChangeField: (value: string) => void
      ) => void)
    | null;
  onSelectFunc?:
    | ((value: string, onChangeField: (value: string) => void) => void)
    | null;
};

const CustomFormShad = ({
  control,
  name,
  title,
  type,
  placeholder,
  onChangeFunc = null,
}: ShadCnFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {onChangeFunc && type ? (
              <Input
                placeholder={placeholder}
                onChange={(e) =>
                  onChangeFunc(name, e.target.value, type, field.onChange)
                }
              />
            ) : (
              <Input placeholder={placeholder} {...field} />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomFormShad;
