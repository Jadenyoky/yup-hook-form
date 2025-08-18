"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { stepSchemas } from "../components/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import store from "store2";
import _ from "lodash";
import gsab from "gsap";

const Page = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, submitCount, isSubmitSuccessful },
  } = useForm({
    mode: "all",
    resolver: yupResolver(stepSchemas[3]),
  });

  console.log(submitCount, isSubmitSuccessful);

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
      label: "Password",
      type: "password",
      required: true,
      placeholder: "Type your password",
      register: register("password"),
      error: errors.password?.message,
    },
  ];

  const complete = (data) => {
    const users = store.get("users") || [];
    const currentUser = _.filter(users, {
      username: data.username,
      password: data.password,
    });

    store.set("currentUser", currentUser);
    console.log(data, currentUser);
    router.push("/profile");
  };

  const all = useRef(null);
  const heroPic = useRef(null);
  const container = useRef(null);
  const title = useRef(null);
  const input = useRef(null);
  const button = useRef(null);

  const animated = () => {
    const tl = gsab.timeline();
    tl.to(heroPic.current, {
      x: 0,
      duration: 0.5,
      ease: "sine.in",
      opacity: 1,
    })
      .to(container.current, {
        scale: 1,
        // duration: 1.5,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(title.current, {
        y: 0,
        // duration: 1,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(input.current, {
        scale: 1,
        // duration: 1.5,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(button.current, {
        y: 0,
        // duration: 1,
        ease: "back.inOut",
        opacity: 1,
      })
      .to(all.current, {
        overflow: "auto",
      });
  };

  useEffect(() => {
    animated();
  }, []);

  return (
    <form onSubmit={handleSubmit(complete)}>
      <main className="h-svh overflow-hidden" ref={all}>
        <div className="min-h-full grid grid-cols-1 md:grid-cols-2 justify-items-center md:items-center md:place-content-center md:gap-16">
          <img
            src="/sign-in-hero.svg"
            className="drop-shadow-lg aspect-video md:h-[600px] opacity-0 -translate-x-50"
            ref={heroPic}
          />

          <div
            className="p-8 flex flex-col gap-8 justify-between w-full bg-white 
        rounded-[24px_24px_0px_0px]
        md:rounded-3xl shadow-lg md:mr-8 
        md:max-w-[500px] opacity-0 scale-50
        "
            ref={container}
          >
            <div
              className="flex flex-col gap-2 opacity-0 -translate-y-10"
              ref={title}
            >
              <h1 className="font-bold text-2xl text-[var(--blue-dark)] ">
                Sign in
              </h1>
              <p className="opacity-40">Type your username and password</p>
            </div>

            <div className="flex flex-col gap-16 ">
              <div
                className="flex flex-col gap-8 max-h-[400px] overflow-y-auto opacity-0 scale-50"
                ref={input}
              >
                {inputs.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[var(--blue)] font-[dynapuff]">
                          {item.label}{" "}
                          {item.required && (
                            <span className="text-sm opacity-50 text-[red]">
                              *
                            </span>
                          )}
                        </label>
                        {item.error && submitCount > 0 && (
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

              <div
                className="font-semibold flex justify-between items-center gap-8 opacity-0 translate-y-10"
                ref={button}
              >
                <button
                  type="button"
                  className={`text-[var(--purple)] opacity-50 rounded-md cursor-pointer hover:opacity-100 transition text-sm md:text-base`}
                  onClick={() => {
                    router.push("/sign-up");
                  }}
                >
                  Not having an account ?
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition text-nowrap"
                  onClick={() => {
                    console.log("done");
                  }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
};

export default Page;
