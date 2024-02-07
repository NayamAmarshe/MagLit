import React from "react";
import { HiOutlineQrcode } from "react-icons/hi";
import { colorsList, shadowList } from "../../utils/bgColors";
import { useTheme } from "next-themes";
import { RiCloseFill } from "react-icons/ri";
import dynamic from "next/dynamic";

const QRCode = dynamic(() => import("./QRCode"), {
  ssr: false,
});

const Card = ({ link, linkIndex, qrCodeIndex, setQRCodeIndex }) => {
  const { theme, setTheme } = useTheme();
  const color = Math.floor(Math.random() * colorsList.length);

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
        <div className="flex flex-row items-center gap-4">
          <a
            target="_blank"
            rel="noreferrer"
            className="w-full truncate text-slate-700 dark:text-stone-200"
            href={typeof link === "string" ? link : link.link}
            id="no-swipe"
          >
            {typeof link === "string" ? link : link.link}
          </a>
          <button
            className="animate rounded-md bg-white/20 p-1 text-2xl text-slate-700 dark:text-stone-200"
            type="button"
            onClick={() => {
              if (qrCodeIndex === null) {
                setQRCodeIndex(linkIndex);
              } else {
                setQRCodeIndex(null);
              }
            }}
          >
            {qrCodeIndex === linkIndex ? <RiCloseFill /> : <HiOutlineQrcode />}
          </button>
        </div>
        {link?.password?.length > 0 ? (
          <p
            className="break-all	text-black/50 dark:text-stone-500"
            id="no-swipe"
          >
            Password: <span className="select-all">{link?.password}</span>
          </p>
        ) : null}
        {qrCodeIndex === linkIndex && (
          <QRCode qrCodeLink={typeof link === "string" ? link : link.link} />
        )}
      </div>
    </div>
  );
};

export default Card;
