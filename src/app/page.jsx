"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import gsab from "gsap";

const Page = () => {
  const router = useRouter();
  const bgMain = useRef(null);
  const container = useRef(null);
  const title = useRef(null);
  const button = useRef(null);

  const animated = () => {
    const tl = gsab.timeline();
    tl.to(bgMain.current, {
      filter: "grayscale(0)",
      // duration: 1,
      ease: "bounce",
      opacity: 1,
    })
      .to(container.current, {
        scale: 1,
        // duration: 1,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(title.current, {
        y: 0,
        // duration: 1,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(button.current, {
        y: 0,
        // duration: 1,
        ease: "back.inOut",
        opacity: 1,
      });
  };

  useEffect(() => {
    animated();
  }, []);

  return (
    <main
      className="min-h-svh flex flex-col items-center justify-center gap-8 bg-[url(/bg1.jpg)] bg-no-repeat bg-cover bg-bottom
    font-[DynaPuff] text-center filter grayscale-100  "
      ref={bgMain}
    >
      <div
        className="bg-[#ffffffbf] p-14 rounded-4xl md:rounded-xl shadow-xl flex flex-col items-center gap-12 max-w-[90%] opacity-0 scale-50"
        ref={container}
      >
        <h1
          className="text-2xl text-[#ff8d63] opacity-0 -translate-y-10"
          ref={title}
        >
          Welcome to the Multi-Step Form
        </h1>
        <div
          className="flex gap-8 text-nowrap opacity-0 translate-y-10"
          ref={button}
        >
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
