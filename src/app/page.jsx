"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Name must be required"),
  email: yup
    .string()
    .email("This email in not valid or wrong")
    .required("Email must be required"),
  password: yup
    .string()
    .min(6, "Password must be min. 6 characters")
    .max(12, "Password must be max. 12 characters")
    .required("Password must be required"),
});

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = (data) => {
    console.log("Navigating...", data);
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(navigate)}>
        <div>
          <label>
            name:
            <input {...register("name")} />
          </label>
          <p>{errors.name?.message}</p>
        </div>
        <div>
          <label>
            email:
            <input {...register("email")} />
          </label>
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>
            password:
            <input {...register("password")} />
          </label>
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default Page;
