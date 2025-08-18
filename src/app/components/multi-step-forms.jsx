"use client";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { stepSchemas } from "./schemas";
import { Step1, Step2, Step3 } from "./steps";
import store from "store2";
import _ from "lodash";
import { useRouter } from "next/navigation";
import gsap from "gsap";
const MultiStepForms = () => {
  const router = useRouter();
  const [currentStep, setcurrentStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(stepSchemas[currentStep]),
    mode: "all",
  });

  const stepsInfo = [
    {
      step: 1,
      title: "Your Info",
      heading: "Getting Started",
      description: "Type your name, age, and phone number to begin.",
      component: <Step1 />,
    },
    {
      step: 2,
      title: "Account Setup",
      heading: "Profile Details",
      description: "Pick a unique username and your email.",
      component: <Step2 />,
    },
    {
      step: 3,
      title: "Secure Access",
      heading: "Password Setup",
      description: "Create a strong password and confirm it.",
      component: <Step3 />,
    },
  ];

  const back = () => {
    setcurrentStep((prev) => {
      const newStep = prev - 1;
      animatedActive(newStep);
      return newStep;
    });
  };

  const next = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      setcurrentStep((prev) => {
        const newStep = prev + 1;
        animatedActive(newStep);
        return newStep;
      });
    }
  };

  const complete = (data) => {
    const users = store.get("users") || [];

    users.push(data);

    const finalUsers = _.uniqBy(users, "username");

    store.set("users", finalUsers);

    const usersStored = store.get("users") || [];
    const currentUser = _.filter(usersStored, {
      username: data.username,
      password: data.password,
    });

    store.set("currentUser", currentUser);
    console.log(data, currentUser);

    router.push("/profile");
  };

  const animated = () => {
    const tl = gsap.timeline();
    tl.to(".stepSection", {
      scale: 1,
      transition: "clip-path 0.5s ",
      clipPath: "circle(71.0% at 50% 50%)",
      ease: "bounce",
    })
      .to(".stepInfo", {
        delay: 0.4,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "sine.inOut",
      })
      .to(".stepTitle", {
        opacity: 1,
        stagger: 0.2,
        x: 0,
        ease: "sine.inOut",
      })
      .to(".button0", {
        scale: 1,
        ease: "sine.inOut",
        stagger: 0.5,
      });
  };

  const animatedActive = (newStep) => {
    gsap.fromTo(
      `.stepInfo${newStep + 1}`,
      {
        scale: 0.5,
        transition: "all 0.5s ",
      },
      {
        scale: 1,
        ease: "sine.inOut",
      }
    );

    gsap.fromTo(
      ".stepTitle",
      {
        opacity: 0,
        x: -20,
      },
      {
        opacity: 1,
        stagger: 0.2,
        x: 0,
        ease: "sine.inOut",
      }
    );
  };

  useEffect(() => {
    animated();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(complete)}>
        <main className="min-h-svh flex items-center justify-center">
          <div
            className="contStep bg-white rounded-xl shadow-lg flex 
       p-3 w-full md:min-h-auto md:w-[90%] lg:w-[70%] md:gap-8 flex-col md:flex-row 
       min-h-svh
       "
          >
            <div
              className={`stepSection md:w-[270px] rounded-2xl md:h-[600px] p-8 bg-[url(/bg-sidebar-desktop.svg)] bg-cover bg-[50%_75%] md:bg-top
            flex md:flex-col md:gap-8 text-white gap-4
            md:justify-start justify-around
            `}
              style={{
                scale: 0.5,
                transition: "clip-path 0.5s ",
                clipPath: "circle(11.7% at 50% 50%)",
              }}
            >
              {stepsInfo.map((step, index) => {
                return (
                  <div
                    key={index}
                    className={`stepInfo stepInfo${
                      index + 1
                    } translate-y-4 opacity-0 flex items-center self-baseline gap-2 flex-wrap`}
                  >
                    <p
                      className={` h-[35px] w-[35px] flex justify-center items-center rounded-full  ${
                        index === currentStep
                          ? "bg-[white] text-[var(--blue)]"
                          : "bg-[var(--blue)] text-[white]"
                      } font-semibold`}
                    >
                      {index + 1}
                    </p>
                    <div className="sm:flex flex-col hidden">
                      <h2 className="opacity-60 text-[13px]">
                        Step {step.step}
                      </h2>
                      <h2 className="font-semibold ">{step.title}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* <div className="flex flex-col flex-1"> */}
            <div className="inputSection p-8 flex flex-col gap-8 justify-between flex-grow">
              <div className="stepTitle -translate-x-4 opacity-0 flex flex-col gap-2">
                <h1 className="font-bold text-2xl text-[var(--blue-dark)] ">
                  {stepsInfo[currentStep]?.heading}
                </h1>
                <p className="opacity-40">
                  {stepsInfo[currentStep]?.description}
                </p>
              </div>

              <div
                className="stepTitle -translate-x-4 opacity-0 flex flex-col gap-2 md:h-[350px] overflow-y-auto 
                flex-1
                "
              >
                <FormProvider {...methods}>
                  {stepsInfo[currentStep]?.component}
                </FormProvider>
              </div>

              <div className="font-semibold flex justify-between gap-4 w-full">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    className={`button0 scale-y-0 text-[var(--purple)] opacity-50 rounded-md cursor-pointer hover:opacity-100 transition`}
                    onClick={() => {
                      back();
                    }}
                  >
                    Go back
                  </button>
                ) : (
                  <button
                    type="button"
                    className={`button0 scale-y-0 text-[var(--purple)] opacity-50 rounded-md cursor-pointer hover:opacity-100 transition text-sm md:text-base`}
                    onClick={() => {
                      router.push("/sign-in");
                    }}
                  >
                    Having an account ?
                  </button>
                )}

                {currentStep < stepsInfo.length - 1 ? (
                  <button
                    type="button"
                    className="button0 scale-y-0 cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition text-nowrap"
                    onClick={() => {
                      next();
                    }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="button0 scale-y-0 cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition text-nowrap"
                    onClick={() => {
                      console.log("done");
                    }}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
          {/* </div> */}
        </main>
      </form>
    </FormProvider>
  );
};

export default MultiStepForms;
