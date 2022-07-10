import { BsFillXCircleFill } from "react-icons/bs";
import { navbarState } from "../../atoms/navbarAtom";
import { useSwipeable } from "react-swipeable";
import { FaGithub } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import FAQSection from "./FAQSection";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      setNavbarOpen(false);
    },
  });

  return (
    <div
      className={`animate absolute z-30 flex h-full w-screen flex-col items-center justify-center overflow-x-hidden ${
        navbarOpen ? "translate-x-0" : "translate-x-full"
      } `}
      {...handlers}
    >
      <button
        className="animate close-button absolute top-5 right-5 z-30 text-xl md:text-3xl"
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillXCircleFill />
      </button>
      <FAQSection />
      <div className="animate mb-10 flex items-center justify-center gap-10 text-black dark:text-stone-300">
        <a
          href="mailto:maglit-admin@protonmail.com"
          target="_blank"
          rel="noreferrer"
          className="animate hover:text-stone/50 flex flex-col items-center  justify-center dark:hover:text-stone-500"
        >
          <ImMail4 className="text-3xl" />
          <p className="font-medium">Contact</p>
        </a>
        <a
          href="https://github.com/NayamAmarshe/MagLit"
          className="animate flex flex-col items-center justify-center hover:text-black/50 dark:hover:text-stone-500"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="text-3xl" />
          <p className="font-medium">GitHub</p>
        </a>
      </div>
      {/* FOOTER */}
      <p className="mb-1 text-slate-500 dark:text-stone-500">
        Made with ⌨ and 🖱
      </p>
      <p className="mb-1 text-sm text-slate-500 dark:text-stone-500">
        Copyright © {new Date().getFullYear()} <b>MagLit</b>
      </p>
    </div>
  );
};

export default Navbar;
