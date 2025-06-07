"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { interviewSchema } from "../schemas/interview";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen"; // Make sure this path is correct

const InterviewForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      language: "English",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);

    const finalData = {
      ...data,
      name: data.name?.trim() === "" ? "Anonymous" : data.name,
    };

    const queryString = new URLSearchParams(finalData).toString();
    router.push(`/interview?${queryString}`);

    reset({
      language: "English",
      role: "",
      level: "",
      interviewType: "",
      name: "",
    });

    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold my-3">
        Please enter your data for the interview
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-2 w-full px-6 py-4 mx-auto"
      >
        {/* Role */}
        <div>
          <label className="block">
            Role<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("role")}
            className="border px-3 py-2 rounded-lg border-gray-300 text-sm w-full"
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block">
            Level<span className="text-red-500">*</span>
          </label>
          <select
            {...register("level")}
            className="border border-gray-300 text-sm px-3 py-2 rounded-lg w-full"
          >
            <option value="">Select level</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm">{errors.level.message}</p>
          )}
        </div>

        {/* Interview Type */}
        <div>
          <label className="block">
            Interview Type<span className="text-red-500">*</span>
          </label>
          <select
            {...register("interviewType")}
            className="border border-gray-300 text-sm px-3 py-2 rounded-lg w-full"
          >
            <option value="">Select type</option>
            <option value="Technical">Technical</option>
            <option value="Behavioral">Behavioral</option>
            <option value="Product">Product</option>
          </select>
          {errors.interviewType && (
            <p className="text-red-500 text-sm">
              {errors.interviewType.message}
            </p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block">Language (optional)</label>
          <input
            disabled
            type="text"
            {...register("language")}
            className="disabled:text-gray-400 border px-3 py-2 rounded-lg border-gray-300 text-sm w-full"
          />
          {errors.language && (
            <p className="text-red-500 text-sm">{errors.language.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block">Name (optional)</label>
          <input
            type="text"
            {...register("name")}
            className="border px-3 py-2 rounded-lg border-gray-300 text-sm w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 mt-2 w-full rounded-xl border-2 border-purple-600 hover:border-black hover:bg-white hover:text-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InterviewForm;
