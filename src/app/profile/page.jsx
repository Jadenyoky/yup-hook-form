"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import store from "store2";

const Page = () => {
  const currentUser = store.get("currentUser");

  const [user, setuser] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    } else {
      setuser(currentUser[0]);
    }
  }, []);

  console.log(user);

  return (
    <main className="h-svh">
      <div className="min-h-[300px] relative ">
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
              src={user?.gender === "male" ? "/avatar-1.jpg" : "/cover-1.jpg"}
              alt=""
              className="h-[100%] w-[100%] p-2 object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center bg-[#ffffffa5] px-4 py-2 rounded-[24px_10px] shadow-md text-center  min-w-[150px] font-[dynapuff]">
            <h1 className="capitalize tracking-wider font-bold text-2xl text-[var(--blue)] ">
              {user?.name}
            </h1>
            <p className="opacity-40"> {`@${user?.username}`}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
