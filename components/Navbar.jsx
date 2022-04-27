import { BsFillXCircleFill } from "react-icons/bs";
import { navbarState } from "../atoms/navbarAtom";
import { useSwipeable } from "react-swipeable";
import { FaGithub } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { useRecoilState } from "recoil";
import React, { useState } from "react";
import FAQSection from "./FAQSection";
import MenuCard from "./MenuCard";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);

  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      setNavbarOpen(false);
    },
  });

  return (
    <div
      className={`animate absolute z-30 h-full w-screen overflow-x-hidden flex flex-col items-center justify-center ${
        navbarOpen ? "translate-x-0" : "translate-x-full"
      } `}
      {...handlers}
    >
      <button
        className="animate absolute top-5 right-5 z-30 text-xl text-slate-400 hover:text-red-500 md:text-3xl"
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillXCircleFill />
      </button>
      <FAQSection />
      <div className="animate mb-10 flex items-center justify-center gap-10 text-black dark:text-white">
        <a
          href="mailto:maglit-admin@protonmail.com"
          target="_blank"
          rel="noreferrer"
          className="animate flex flex-col items-center justify-center  hover:text-black/50 dark:hover:text-gray-500"
        >
          <ImMail4 className="text-3xl" />
          <p className="font-medium">Contact</p>
        </a>
        <a
          href="https://github.com/NayamAmarshe/MagLit"
          className="animate flex flex-col items-center justify-center hover:text-black/50 dark:hover:text-gray-500"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="text-3xl" />
          <p className="font-medium">GitHub</p>
        </a>
      </div>
      {/* FOOTER */}
      <p className="text-slate-500 mb-1">Made with ⌨ and 🖱</p>
      <p className="text-slate-500 mb-1 text-sm">
        Copyright © {new Date().getFullYear()} <b>MagLit</b>
      </p>
    </div>
  );
};

export default Navbar;
