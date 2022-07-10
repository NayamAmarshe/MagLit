import {
  colorsList,
  shadowList,
  darkColorsList,
  darkShadowList,
} from "../../utils/bgColors";
import { cardsOpenState } from "../../atoms/cardsOpenState";
import { BsFillXCircleFill } from "react-icons/bs";
import { linksState } from "../../atoms/linksState";
import { useSwipeable } from "react-swipeable";
import { useRecoilState } from "recoil";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { HiOutlineQrcode } from "react-icons/hi";
import dynamic from "next/dynamic";
const QRCode = dynamic(() => import("./QRCode"), {
  ssr: false,
});

const ScrollingCards = () => {
  // !THIRD PARTY HOOKS
  const { theme, setTheme } = useTheme();

  // !GLOBAL
  const [cardsOpen, setCardsOpen] = useRecoilState(cardsOpenState);
  const [links, setLinks] = useRecoilState(linksState);
  const [qrCodeIndex, setQRCodeIndex] = useState(null);

  const handlers = useSwipeable({
    onSwipedDown: (e) => {
      if (e.event.target.id !== "no-swipe") setCardsOpen(false);
    },
    onSwipedLeft: (e) => {
      if (e.event.target.id !== "no-swipe") setCardsOpen(false);
    },
  });

  const handleScroll = (e) => {
    if (e.target.id === "parent" && e.deltaY < 0) {
      setCardsOpen(false);
    }
  };

  return (
    <div
      className={`animate absolute z-40 flex h-full w-full flex-col items-center justify-center overflow-x-hidden bg-transparent ${
        cardsOpen
          ? "-translate-x-0 md:translate-x-0 md:translate-y-0"
          : "-translate-x-full md:translate-x-0 md:translate-y-full"
      } `}
      onWheel={handleScroll}
      {...handlers}
      id="parent"
    >
      <button
        className="animate close-button absolute top-5 right-5 z-30 bg-transparent text-xl md:text-3xl"
        onClick={() => {
          setCardsOpen(!cardsOpen);
        }}
      >
        <BsFillXCircleFill />
      </button>
      <h3 className="pb-4 text-center text-2xl font-bold text-slate-600 dark:text-stone-300">
        LIT🔥LINKS
      </h3>
      {links.length !== 0 ? (
        <div
          className="z-30 h-2/3 w-full gap-12 overflow-y-auto overflow-x-hidden
          rounded-xl p-2 pb-10 text-center sm:w-auto"
        >
          {links.map((link, linkIndex) => {
            let color = Math.floor(Math.random() * colorsList.length);
            return (
              <div
                key={linkIndex}
                className={`animate mx-auto my-5 flex max-w-md flex-col items-center justify-between gap-5 rounded-xl bg-opacity-40 p-5 shadow-lg hover:bg-cyan-100/40 hover:shadow-cyan-200 dark:hover:bg-stone-600 sm:flex-row ${
                  theme === "light" && colorsList[color]
                } ${theme === "dark" && "bg-stone-700/40"} ${
                  theme === "light" && shadowList[color]
                } ${theme === "dark" && "shadow-none"} `}
              >
                <div className="flex w-full flex-col">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    className="w-full truncate text-slate-700 dark:text-stone-200"
                    href={typeof link === "string" ? link : link.link}
                    id="no-swipe"
                  >
                    {typeof link === "string" ? link : link.link}
                  </a>
                  {link?.password?.length > 0 ? (
                    <p
                      className="break-all	text-black/50 dark:text-stone-500"
                      id="no-swipe"
                    >
                      Password:{" "}
                      <span className="select-all">{link?.password}</span>
                    </p>
                  ) : null}
                  {qrCodeIndex === linkIndex && (
                    <QRCode
                      qrCodeLink={typeof link === "string" ? link : link.link}
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (qrCodeIndex === null) {
                      setQRCodeIndex(linkIndex);
                    } else {
                      setQRCodeIndex(null);
                    }
                  }}
                >
                  <HiOutlineQrcode />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg bg-red-400 p-5 text-center text-white dark:bg-red-900 dark:text-red-200">
          <h4 className="text-xl font-semibold leading-none">
            No links found.
          </h4>
          <br /> Your maglit links appear here.
        </div>
      )}
    </div>
  );
};

export default ScrollingCards;
