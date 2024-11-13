import Header from "@/Components/Shared/Header";
import TransformationForm from "@/Components/Shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AddTransformationTypes = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const transformation = transformationTypes[type];
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await getUserById(userId);

  return (
    <div>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-12">
        <TransformationForm
          action="Add"
          userId={user._id}
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </div>
  );
};

export default AddTransformationTypes;
