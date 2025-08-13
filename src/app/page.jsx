"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <main
      className="min-h-svh flex flex-col items-center justify-center gap-8 bg-[url(/bg1.jpg)] bg-no-repeat bg-cover bg-bottom
    font-[DynaPuff] "
    >
      <div className="bg-[#ffffffbf] p-14 rounded-2xl shadow-xl flex flex-col items-center gap-12 max-w-[90%]">
        <h1 className="text-2xl text-[#ff8d63]">
          Welcome to the Multi-Step Form
        </h1>
        <div className="flex gap-8 ">
          <button
            className="cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition  "
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </button>
          <button
            className="cursor-pointer bg-[var(--blue)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition  "
            onClick={() => router.push("/sign-in")}
          >
            Sign in
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
