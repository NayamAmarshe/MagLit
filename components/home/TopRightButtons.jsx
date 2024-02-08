import { BsFillGridFill } from "react-icons/bs";
import { useTheme } from "next-themes";
import React from "react";

const TopRightButtons = ({ cardsOpen, navbarOpen, setNavbarOpen }) => {
  // !THIRD PARTY HOOKS
  const { theme, setTheme } = useTheme();

  return (
    <div className="absolute right-5 top-5 z-50 flex flex-row-reverse gap-5">
      {/* MENU LINK */}
      <button
        className={`${
          navbarOpen || cardsOpen
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100"
        } animate rounded-sm text-xl text-slate-400 hover:text-blue-500 dark:text-stone-400 dark:hover:text-stone-300 md:text-3xl`}
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillGridFill />
      </button>

      {/* THEME TOGGLE */}
      <button
        className={`animate animate relative flex h-[20px] w-12 items-center justify-center gap-2 rounded-full bg-slate-400 dark:bg-stone-400 md:h-[30px] md:w-14 ${
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
              ? "animate -translate-x-3 bg-slate-50"
              : "animate translate-x-3 bg-slate-50"
          } animate absolute z-10 h-4 w-4 rounded-full md:h-6 md:w-6`}
        ></div>
        <div className="absolute left-1 text-xs md:text-base">🌞</div>
        <div className="absolute right-1 text-xs md:text-base">🌚</div>
      </button>
    </div>
  );
};

export default TopRightButtons;
