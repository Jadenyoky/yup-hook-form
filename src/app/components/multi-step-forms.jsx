"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider } from "react-hook-form";
import { stepSchemas } from "./schemas";
import { Step1, Step2, Step3 } from "./steps";
import store from "store2";
import _, { head } from "lodash";
import { useRouter } from "next/navigation";

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

  const next = async () => {
    const isValid = await methods.trigger();
    isValid && setcurrentStep((prev) => prev + 1);
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

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(complete)}>
        <main className="min-h-screen flex items-center justify-center">
          <div
            className="bg-white rounded-xl shadow-lg flex 
      overflow-hidden p-3 w-[90%] lg:w-[70%] gap-8"
          >
            <div
              className={`w-[270px] rounded-2xl h-[600px] p-8 bg-[url(/bg-sidebar-desktop.svg)] bg-cover 
            flex flex-col gap-8 text-white
            `}
            >
              {stepsInfo.map((step, index) => {
                return (
                  <div
                    key={index}
                    className="flex items-center self-baseline gap-4"
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
                    <div className="flex flex-col">
                      <h2 className="opacity-60 text-[13px]">
                        Step {step.step}
                      </h2>
                      <h2 className="font-semibold">{step.title}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid  flex-1">
              <div className="p-8 flex flex-col gap-8 justify-between ">
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-2xl text-[var(--blue-dark)] ">
                    {stepsInfo[currentStep]?.heading}
                  </h1>
                  <p className="opacity-40">
                    {stepsInfo[currentStep]?.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 h-[350px] overflow-y-auto">
                  <FormProvider {...methods}>
                    {stepsInfo[currentStep]?.component}
                  </FormProvider>
                </div>

                <div className="font-semibold flex justify-between ">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      className={`text-[var(--purple)] opacity-50 rounded-md cursor-pointer hover:opacity-100 transition`}
                      onClick={() => {
                        currentStep > 0 && setcurrentStep((prev) => prev - 1);
                      }}
                    >
                      Go back
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={`text-[var(--purple)] opacity-50 rounded-md cursor-pointer hover:opacity-100 transition`}
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
                      className="cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition  "
                      onClick={() => {
                        next();
                      }}
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="cursor-pointer bg-[var(--blue-dark)] text-white px-6 py-2 rounded-lg hover:bg-[var(--purple)] transition  "
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
          </div>
        </main>
      </form>
    </FormProvider>
  );
};

export default MultiStepForms;
