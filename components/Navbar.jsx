import { BsFillXCircleFill } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { useRecoilState } from "recoil";
import { navbarState } from "../atoms/navbarAtom";
import MenuCard from "./MenuCard";
import React from "react";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);

  return (
    <div
      className={`animate absolute z-30 h-full w-screen overflow-x-hidden bg-white/0 ${
        navbarOpen
          ? "translate-x-0 backdrop-blur-lg"
          : "translate-x-full backdrop-blur-none"
      } `}
    >
      <button
        className="animate fixed top-5 right-5 z-50 text-xl text-slate-400 hover:text-red-500 focus:text-red-500 md:text-3xl"
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillXCircleFill />
      </button>
      <div className="mt-20 mb-10 flex flex-col items-center justify-center gap-5 md:mb-20 md:mt-20 md:gap-10">
        <MenuCard
          heading="The hell is this? 🤔"
          content="MagLit is an encrypted and privacy respecting Link Shortener service
            that supports not only your regular website links but also Magnet Links which are extensively used to download
            and share torrents."
          content2="MagLit admins cannot ever see what links you light up once you encrypt them using your own secret key."
          bgColor="bg-green-100"
          shadowColor="shadow-green-200"
          hoverShadowColor="hover:shadow-green-200"
        />
        <MenuCard
          heading="Is it open-source? 🌚"
          content="Yes 100% MagLit is a totally free and open source software licensed under AGPLv3. All your requests are proxied through a server and no personal data is stored, well, except for the links you encrypt."
          bgColor="bg-purple-100"
          shadowColor="shadow-purple-200"
          hoverShadowColor="hover:shadow-purple-200"
        />
        <MenuCard
          heading="My adblock detected a tracker! 🤥"
          content="Don't worry, MagLit uses 'counter.dev analytics'. Your IP is not logged, no cookies are stored, no fingerprinting data is used to spy on you. It just helps us know what countries are accessing maglit.ml and what different screen sizes are accessing this website. It can help us optimize the website layout better. Still, if you don't want to share your screen size and country, please feel free to block the script using your adblocker."
          bgColor="bg-cyan-100"
          shadowColor="shadow-cyan-200"
          hoverShadowColor="hover:shadow-cyan-200"
        />
      </div>
      <div className="animate mt-4 mb-4 flex items-center justify-center gap-10">
        <a
          href="mailto:maglit-admin@protonmail.com"
          target="_blank"
          rel="noreferrer"
          className="animate flex flex-col items-center justify-center hover:text-black/50 focus:text-black/50"
        >
          <ImMail4 className="text-3xl" />
          <p className="font-medium">Contact</p>
        </a>
        <a
          href="https://github.com/NayamAmarshe/MagLit"
          className="animate flex flex-col items-center justify-center hover:text-black/50 focus:text-black/50"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="text-3xl" />
          <p className="font-medium">GitHub</p>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
