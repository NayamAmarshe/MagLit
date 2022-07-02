import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import React from "react";

const QRCodeModal = ({ setShowQRCodeModal }) => {
  return (
    <Backdrop
      onClickHandler={() => {
        setShowQRCodeModal(false);
      }}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ y: -50 }}
        className="max-w-mid relative z-50 flex flex-col items-center justify-start rounded-xl bg-slate-50 ring-8 ring-slate-200/70 dark:bg-stone-900 dark:ring-stone-700/70"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="animate close-button absolute top-2 right-2 text-2xl"
          onClick={() => {
            setShowQRCodeModal(false);
          }}
        >
          <AiFillCloseCircle />
        </button>
        <h4 className="mt-5 text-2xl font-semibold text-slate-400 dark:text-stone-500">
          QR Code
        </h4>
        <div className="mt-2 flex h-full w-full flex-col items-center justify-center space-y-5 p-5">
          <img
            src="https://imgs.search.brave.com/Hw1BCnBpyZVrpPfnzigNCMA0LKtd0gKzP0AWyUHGCSk/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/aW1lZGljYWxhcHBz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxMS8xMS9xci1j/b2RlLmpwZw"
            alt=""
            className="h-96 w-96"
          />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default QRCodeModal;
