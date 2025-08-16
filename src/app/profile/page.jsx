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
      bgColor: "#006064",
      titleColor: "#80deea",
      contentColor: "#e0f7fa",
    },

    {
      icon: "fi fi-rr-hastag",
      title: "age",
      content: user?.age,
      bgColor: "#3a9a3a",
      titleColor: "#b5e89f",
      contentColor: "#e0f7b7",
    },
    {
      icon: "fi fi-rr-at",
      title: "username",
      content: `@${user?.username}`,
      bgColor: "#e88e24",
      titleColor: "#fff176",
      contentColor: "#fff9c4",
    },

    {
      icon: "fi fi-rr-venus-mars",
      title: "gender",
      content: user?.gender,
      bgColor: "#d63031",
      titleColor: "#f6e58d",
      contentColor: "#f1f9ff",
    },
    {
      icon: "fi fi-rr-phone-flip",
      title: "phone number",
      content: user?.phone,
      bgColor: "#1A397C",
      titleColor: "#4F8CC9",
      contentColor: "#A8C8E3",
    },
  ];

  const handleDeleteAccount = () => {
    store.remove("currentUser");
    setloading(false);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const handleLogout = () => {
    setloading(false);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <main className="min-h-svh">
      {loading ? (
        <div className="flex flex-col min-h-svh justify-between gap-4">
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
              <div className="flex flex-col justify-center bg-[white] px-4 py-2 rounded-[24px_10px] shadow-md text-center  min-w-[150px] font-[dynapuff]">
                <h1 className="capitalize tracking-wider font-bold text-2xl text-[var(--blue)] ">
                  {user?.name}
                </h1>
                <p className="opacity-40"> {`${user?.email}`}</p>
              </div>
            </div>
          </div>

          <div className="p-8 flex flex-wrap gap-8 justify-center items-center">
            {profileData
              .filter((e) => e.content)
              .map((e, i) => {
                return (
                  <div
                    key={i}
                    className={` flex flex-col justify-start items-baseline gap-4 px-8 py-5 rounded-xl shadow-md h-[150px] min-w-[150px] relative `}
                    style={{
                      borderRadius: "20% 80% 17% 83% / 78% 11% 89% 22%",
                      backgroundColor: e.bgColor,
                    }}
                  >
                    {" "}
                    <i
                      className={`${e.icon}
              absolute bottom-0 right-0 text-3xl 
              -rotate-5 bg-amber-50 rounded-full h-[50px] w-[50px] flex items-center justify-center
              `}
                      style={{
                        color: e.bgColor,
                      }}
                    ></i>
                    <div
                      className={`capitalize tracking-wider font-bold text-xs drop-shadow-2xl flex items-center justify-between w-full gap-2 text-wrap opac`}
                      style={{
                        color: e.titleColor,
                      }}
                    >
                      {e.title}
                    </div>
                    <div
                      className={`font-[dynapuff] text-3xl font-bold gap-2 flex opac`}
                      style={{
                        color: e.contentColor,
                      }}
                    >
                      {e.content}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex md:gap-8 justify-around sm:justify-center items-center p-5 font-semibold font-[dynapuff] bg-[white] border-t-2 border-[gainsboro]">
            <button
              type="button"
              className="cursor-pointer text-[var(--purple)] px-6 py-2 rounded-lg opacity-50 hover:opacity-100 hover:text-[#d63031] transition text-nowrap"
              onClick={() => {
                handleDeleteAccount();
              }}
            >
              Delete Account
            </button>
            <button
              type="button"
              className="cursor-pointer bg-[var(--purple)] text-white px-6 py-2 rounded-lg hover:bg-[#d63031] transition text-nowrap "
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
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
