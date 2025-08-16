"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import store from "store2";
import Loader from "@/app/components/loader";

const Page = () => {
  const currentUser = store.get("currentUser");

  const [user, setuser] = useState([]);
  const [loading, setloading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    } else {
      setuser(currentUser[0]);
      setTimeout(() => {
        setloading(true);
      }, 2000);
    }
  }, []);

  console.log(user);

  const profileData = [
    {
      icon: "fi fi-rr-user",
      title: "name",
      content: user?.name,
      color: "",
    },

    {
      icon: "fi fi-rr-hastag",
      title: "age",
      content: user?.age,
      color: "",
    },
    {
      icon: "fi fi-rr-at",
      title: "username",
      content: `@${user?.username}`,
      color: "",
    },

    {
      icon: "fi fi-rr-venus-mars",
      title: "gender",
      content: user?.gender,
      color: "",
    },
    {
      icon: "fi fi-rr-phone-flip",
      title: "phone number",
      content: user?.phone,
      color: "",
    },
  ];

  return (
    <main className="min-h-svh">
      {loading ? (
        <div className="flex flex-col gap-8">
          <div className="min-h-[300px] relative">
            <img
              src={user?.gender === "male" ? "/cover-1.jpg" : "/avatar-1.jpg"}
              alt=""
              srcSet=""
              className="z-[-1] absolute top-0 h-full w-full object-cover mask-[url(/wave.svg)] mask-no-repeat mask-position-[center_-50px] mask-size-[cover] "
            />
            <div className="absolute left-1/2 top-3/5 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center justify-center">
              <div
                className="z-10 flex  items-center justify-center h-[150px] w-[150px] rounded-full bg-[var(--background-main)] shadow-md
          "
              >
                <img
                  src={
                    user?.gender === "male" ? "/avatar-1.jpg" : "/cover-1.jpg"
                  }
                  alt=""
                  className="h-[100%] w-[100%] p-2 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col justify-center bg-[#ffffffa5] px-4 py-2 rounded-[24px_10px] shadow-md text-center  min-w-[150px] font-[dynapuff]">
                <h1 className="capitalize tracking-wider font-bold text-2xl text-[var(--blue)] ">
                  {user?.name}
                </h1>
                <p className="opacity-40"> {`${user?.email}`}</p>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-wrap gap-8 justify-center items-center">
            {profileData.map((e, i) => {
              return (
                <div
                  key={i}
                  className=" flex flex-col justify-start items-baseline gap-4 bg-[#ffcc00] px-8 py-5 rounded-xl shadow-md h-[150px] min-w-[150px] relative overflow-hidden"
                  style={{
                    borderRadius: "20% 80% 17% 83% / 78% 11% 89% 22%",
                  }}
                >
                  {" "}
                  <i
                    className={`${e.icon}
              absolute bottom-0 right-[10px] opacity-15 text-5xl 
              -rotate-5
              `}
                  ></i>
                  <div className="capitalize tracking-wider font-bold text-xs text-[#262222] drop-shadow-2xl flex items-center justify-between w-full gap-2 opacity-50 text-wrap">
                    {e.title}
                  </div>
                  <div className="opacity-80 text-[var(--blue)] font-[dynapuff] text-2xl gap-2 flex ">
                    {e.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-svh grid place-content-center  ">
          <img
            src="/cover-1.jpg"
            alt=""
            className="absolute h-svh w-full object-cover brightness-20"
          />
          <Loader />
        </div>
      )}
    </main>
  );
};

export default Page;
