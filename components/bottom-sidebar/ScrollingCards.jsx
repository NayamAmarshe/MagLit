import { colorsList, shadowList } from "../../utils/bgColors";
import { cardsOpenState } from "../../atoms/cardsOpenState";
import { linksState } from "../../atoms/linksState";
import React, { useEffect, useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { HiOutlineQrcode } from "react-icons/hi";
import { useSwipeable } from "react-swipeable";
import { useAtom } from "jotai";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Card from "./Card";

const QRCode = dynamic(() => import("./QRCode"), {
  ssr: false,
});

const ScrollingCards = () => {
  // !THIRD PARTY HOOKS
  const { theme, setTheme } = useTheme();

  // !GLOBAL
  const [cardsOpen, setCardsOpen] = useAtom(cardsOpenState);
  const [links, setLinks] = useAtom(linksState);
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
        className="animate close-button absolute right-5 top-5 z-30 bg-transparent text-xl md:text-3xl"
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
            return (
              <Card
                key={linkIndex}
                link={link}
                linkIndex={linkIndex}
                qrCodeIndex={qrCodeIndex}
                setQRCodeIndex={setQRCodeIndex}
              />
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
