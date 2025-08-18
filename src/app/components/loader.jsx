import React, { useEffect } from "react";
import gsap from "gsap";

const Loader = () => {
  const animated = () => {
    const tl = gsap.timeline();
    tl.to(".image1", {
      opacity: 1,
      transition: "clip-path 0.5s ",
      clipPath: "circle(11.7% at 50% 50%)",
    }).to(".image1", {
      transition: "clip-path 0.5s ",
      clipPath: "circle(71.0% at 50% 50%)",
    });

    tl.to(".image2", {
      opacity: 1,
      transition: "clip-path 0.5s ",
      clipPath: "circle(11.7% at 50% 50%)",
    }).to(".image2", {
      transition: "clip-path 0.5s ",
      clipPath: "circle(71.0% at 50% 50%)",
    });
  };
  useEffect(() => {
    animated();
  }, []);
  return (
    <div className="h-svh grid place-content-center ">
      <img
        src="/cover-1.jpg"
        alt=""
        className="image1 opacity-0 absolute h-svh w-full object-cover brightness-20"
      />
      <img
        src="/avatar-1.jpg"
        alt=""
        className="image2 opacity-0 absolute h-svh w-full object-cover brightness-20"
      />

      <div className="loader"></div>
    </div>
  );
};

export default Loader;
