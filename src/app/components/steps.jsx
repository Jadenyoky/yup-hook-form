"use client";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const Step1 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputs = [
    {
      label: "Name",
      type: "text",
      required: true,
      placeholder: "Type your name",
      register: register("name"),
      error: errors.name?.message,
    },
    {
      label: "Age",
      type: "number",
      required: true,
      placeholder: "Type your age",
      register: register("age"),
      error: errors.age?.message,
    },
    {
      label: "Phone number",
      type: "tel",
      required: false,
      placeholder: "Type your phone number",
      register: register("phone"),
      error: errors.phone?.message,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {inputs.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[var(--blue)] font-[dynapuff]">
                {item.label}{" "}
                {item.required && (
                  <span className="text-sm opacity-50 text-[red]">*</span>
                )}
              </label>
              {item.error && (
                <p className="flex justify-center items-center bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">
                  {item.error}
                </p>
              )}
            </div>
            <input
              type={item.type}
              {...item.register}
              placeholder={item.placeholder}
              className="border border-[gainsboro] px-4 py-2 rounded-md shadow-sm outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};

export const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputs = [
    {
      label: "Username",
      type: "text",
      required: true,
      placeholder: "Type your username",
      register: register("username"),
      error: errors.username?.message,
    },
    {
      label: "Email",
      type: "email",
      required: true,
      placeholder: "Type your email",
      register: register("email"),
      error: errors.email?.message,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {inputs.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[var(--blue)] font-[dynapuff]">
                {item.label}{" "}
                {item.required && (
                  <span className="text-sm opacity-50 text-[red]">*</span>
                )}
              </label>
              {item.error && (
                <p className="flex justify-center items-center bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">
                  {item.error}
                </p>
              )}
            </div>
            <input
              type={item.type}
              {...item.register}
              placeholder={item.placeholder}
              className="border border-[gainsboro] px-4 py-2 rounded-md shadow-sm outline-none"
            />
          </div>
        );
      })}

      <div className="flex flex-col justify-between items-center flex-wrap gap-4">
        <div className="w-full flex justify-between items-center">
          <label className="text-[var(--blue)] font-[dynapuff]">
            Gender
            <span className="text-sm opacity-50 text-[red]"> *</span>
          </label>
          {errors.gender?.message && (
            <p className="flex justify-center items-center bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">
              {errors.gender?.message}
            </p>
          )}
        </div>
        <div className="flex gap-4 w-full">
          <div className="flex gap-2 bg-[var(--background-main)] px-4 py-2 rounded-3xl text-[var(--blue)] border border-[gainsboro]">
            <input type="radio" value="male" {...register("gender")} />
            <p>Male</p>
          </div>
          <div className="flex gap-2 bg-[var(--background-main)] px-4 py-2 rounded-3xl text-[var(--blue)] border border-[gainsboro]">
            <input type="radio" value="female" {...register("gender")} />
            <p>Female</p>
          </div>
        </div>
        {/* <p className=" bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs w-fit">
          {errors.gender?.message}
        </p> */}
      </div>
    </div>
  );
};

export const Step3 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputs = [
    {
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Type your password",
      register: register("password"),
      error: errors.password?.message,
    },
    {
      label: "Confirm Password",
      type: "password",
      required: true,
      placeholder: "Type your confirm password",
      register: register("confirmPassword"),
      error: errors.confirmPassword?.message,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {inputs.map((item, index) => {
        return (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[var(--blue)] font-[dynapuff]">
                {item.label}{" "}
                {item.required && (
                  <span className="text-sm opacity-50 text-[red]">*</span>
                )}
              </label>
              {item.error && (
                <p className="flex justify-center items-center bg-red-100 text-red-500 px-2 py-1 rounded-full text-xs">
                  {item.error}
                </p>
              )}
            </div>
            <input
              type={item.type}
              {...item.register}
              placeholder={item.placeholder}
              className="border border-[gainsboro] px-4 py-2 rounded-md shadow-sm outline-none"
            />
          </div>
        );
      })}
    </div>
  );
};
