import { BsFillGridFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import React from "react";

const TopRightButtons = ({ cardsOpen, navbarOpen, setNavbarOpen }) => {
  // !THIRD PARTY HOOKS
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute top-5 right-5 z-10 flex flex-row-reverse gap-5">
      {/* MENU LINK */}
      <button
        className={`${
          navbarOpen || cardsOpen
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100"
        } animate rounded-sm text-xl text-slate-400 hover:text-blue-500 md:text-3xl`}
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillGridFill />
      </button>

      {/* THEME TOGGLE */}
      <button
        className={`animate bg-slate-400 w-12 md:w-14 h-[20px] md:h-[30px] animate flex items-center justify-center rounded-full gap-2 relative ${
          navbarOpen || cardsOpen
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100"
        }`}
        onClick={() => {
          theme === "dark" ? setTheme("light") : setTheme("dark");
        }}
      >
        <div
          className={`${
            theme === "dark"
              ? "animate bg-slate-50 -translate-x-3"
              : "animate translate-x-3 bg-slate-50"
          } animate absolute w-4 h-4 md:w-6 md:h-6 z-10 rounded-full`}
        ></div>
        <div className="absolute left-1 text-sm md:text-base">🌞</div>
        <div className="absolute right-1 text-sm md:text-base">🌚</div>
      </button>
    </div>
  );
};

export default TopRightButtons;
