import React, { useEffect } from "react";
import gsap from "gsap";

const Loader = () => {
  const animated = () => {
    const tl = gsap.timeline();
    tl.to(".image1", {
      scale: 1,
      transition: "clip-path 0.5s ",
      clipPath: "circle(11.7% at 50% 51%)",
      ease: "bounce",
    }).to(".image1", {
      transition: "clip-path 0.5s ",
      clipPath: "circle(71.0% at 50% 50%)",
      ease: "bounce",
    });

    tl.to(".image2", {
      scale: 1,
      transition: "clip-path 0.5s ",
      clipPath: "circle(11.7% at 50% 50%)",
      ease: "bounce",
    }).to(".image2", {
      transition: "clip-path 0.5s ",
      clipPath: "circle(71.0% at 50% 50%)",
      ease: "bounce",
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
        className="image1 scale-0 absolute h-svh w-full object-cover brightness-20"
      />
      <img
        src="/avatar-1.jpg"
        alt=""
        className="image2 scale-0 absolute h-svh w-full object-cover brightness-20"
      />
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
