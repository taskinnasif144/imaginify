import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../TransformationForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/Components/ui/form";
import { ShadCnFormProps } from "./CustomFormShad";
import { aspectRatioOptions } from "@/constants";
import { AspectRatioKey } from "@/lib/utils";

const CustomSelectShad = ({
  control,
  name,
  title,
  selectElements,
  onSelectFunc,
}: ShadCnFormProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{title}</FormLabel>
          <FormControl>
            {onSelectFunc && (
              <Select
                onValueChange={(value) => onSelectFunc(value, field.onChange)}
                defaultValue={field.value}
                {...field}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={title} />
                </SelectTrigger>
                <SelectContent>
                  {selectElements?.map((item) => {
                    return (
                      <SelectItem key={item} value={item}>
                        {aspectRatioOptions[item as AspectRatioKey].label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomSelectShad;
