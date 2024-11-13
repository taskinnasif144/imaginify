"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  aspectRatioOptions,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { title } from "process";
import CustomSelectShad from "./CustomShad/CustomSelectShad";
import CustomFormShad from "./CustomShad/CustomFormShad";
import { AspectRatioKey } from "@/lib/utils";

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  promt: z.string().optional(),
  publicId: z.string(),
});

// JSX Function Starts From Here

const TransformationForm = ({
  action,
  data = null,
  type,
  config = null,
}: TransformationFormProps) => {
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const transformationType = transformationTypes[type];

  const initialValues =
    data && action === "Update"
      ? {
          title: data.title,
          aspectRatio: data.aspectRatio,
          color: data.color,
          promt: data.promt,
          publicId: data.publicId,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const onTransformHandler = () => {};

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    console.log(fieldName, value);
  };

  const onSelectFunctionHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    const imageSize =
      aspectRatioOptions[value as keyof typeof aspectRatioOptions];
    setImage((prev: any) => ({
      ...prev,
      aspectRatios: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);
    return onChangeField(value);
  };

  const aspectRatios = Object.keys(aspectRatioOptions);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
        <CustomFormShad
          control={form.control}
          title="Color"
          placeholder="Color"
          name="color"
        />

        {type === "fill" && (
          <CustomSelectShad
            control={form.control}
            title="Aspect Ratio"
            placeholder="Aspect Ratio"
            name="aspectRatio"
            selectElements={aspectRatios}
            onSelectFunc={onSelectFunctionHandler}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <CustomFormShad
            control={form.control}
            name="promt"
            onChangeFunc={onInputChangeHandler}
            title={
              type === "recolor" ? "Object to Recolor" : "Object to Remove"
            }
            type={type}
            placeholder={
              type === "recolor"
                ? "Promt: eg. Change the hoodie color from red to blue"
                : "Promt: eg. Remove the bird form the sky"
            }
          />
        )}

        {type === "recolor" && (
          <CustomFormShad
            control={form.control}
            title="Replacement Color"
            placeholder="Red"
            name="color"
            type={type}
            onChangeFunc={onInputChangeHandler}
          />
        )}
        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="submit-button capitalize"
            disabled={isTransforming || newTransformation === null}
            onClick={onTransformHandler}
          >
            {isTransforming ? "Transforming..." : "Apply Transformation"}
          </Button>
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
