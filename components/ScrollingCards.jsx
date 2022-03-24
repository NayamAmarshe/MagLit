import { colorsList, shadowList } from "../utils/bgColors";
import { cardsOpenState } from "../atoms/cardsOpenState";
import { BsFillXCircleFill } from "react-icons/bs";
import { linksState } from "../atoms/linksState";
import { useSwipeable } from "react-swipeable";
import { useRecoilState } from "recoil";
import React from "react";

const ScrollingCards = () => {
  const [cardsOpen, setCardsOpen] = useRecoilState(cardsOpenState);
  const [links, setLinks] = useRecoilState(linksState);

  const handlers = useSwipeable({
    onSwipedDown: (e) => {
      if (e.event.target.id === "parent") setCardsOpen(false);
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
          ? "-translate-x-0 md:translate-x-0 md:translate-y-0 backdrop-blur-lg"
          : "-translate-x-full md:translate-x-0 md:translate-y-full backdrop-blur-none"
      } `}
      onWheel={handleScroll}
      {...handlers}
      id="parent"
    >
      <button
        className="animate absolute top-5 right-5 z-30 text-xl text-slate-400 hover:text-red-500 md:text-3xl bg-transparent"
        onClick={() => {
          setCardsOpen(!cardsOpen);
        }}
      >
        <BsFillXCircleFill />
      </button>
      <h3 className="pb-4 text-center text-2xl font-bold text-slate-600">
        LIT🔥LINKS
      </h3>
      {links.length !== 0 ? (
        <div
          id="child"
          className="z-30 h-2/3 w-11/12 gap-12 overflow-y-auto overflow-x-hidden rounded-xl p-2 pb-10 text-center sm:w-auto"
        >
          {links.map((link, linkIndex) => {
            let color = Math.floor(Math.random() * colorsList.length);
            return (
              <div
                key={linkIndex}
                className={`animate mx-auto my-auto flex w-11/12 items-center justify-center truncate rounded-xl ${colorsList[color]} bg-opacity-40 p-5 my-5 shadow-lg ${shadowList[color]} hover:bg-cyan-100/40 hover:shadow-cyan-200`}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-slate-700"
                  href={link}
                >
                  {link}
                </a>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg bg-red-400 p-5 text-center text-white">
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
