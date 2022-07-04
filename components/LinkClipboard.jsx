import { FiCopy } from "react-icons/fi";
import React from "react";
import { useRecoilState } from "recoil";
import { downloadQRCodeState } from "../atoms/downloadQRCodeState";
import dynamic from "next/dynamic";
const QRCode = dynamic(() => import("./QRCode"), {
  ssr: false,
});

const LinkClipboard = ({ copyToClipboard, outputLink }) => {
  const [downloadQRCode, setDownloadQRCode] =
    useRecoilState(downloadQRCodeState);

  return (
    <>
      <button
        onClick={copyToClipboard}
        className={
          outputLink.length > 1
            ? `animate relative mx-auto mt-7 flex h-10 w-11/12 items-center justify-center truncate rounded-xl bg-green-300 py-10 text-green-800 hover:cursor-pointer hover:shadow-inner hover:shadow-green-500 focus:shadow-inner focus:shadow-green-400 dark:bg-green-500 dark:text-green-900 dark:hover:bg-green-400 dark:hover:shadow-green-700 dark:focus:shadow-green-800`
            : `animate relative flex h-0 scale-y-0 items-center justify-center truncate`
        }
      >
        <h1 className="w-[70%] truncate">{outputLink}</h1>
        <FiCopy className="right-10" />
        {downloadQRCode && (
          <div className="hidden">
            <QRCode qrCodeLink={outputLink} instantDownload={true} />
          </div>
        )}
      </button>
    </>
  );
};

export default LinkClipboard;
