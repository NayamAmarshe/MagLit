import { AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import { Backdrop } from "./Backdrop";
import React from "react";

const LinkOptionsModal = ({
  customSlug,
  setCustomSlug,
  setLinkSettingsOpen,
  linkSettingsOpen,
}) => {
  return (
    <Backdrop
      onClickHandler={() => {
        setLinkSettingsOpen(false);
      }}
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        exit={{ y: -50 }}
        className="max-w-mid relative flex flex-col items-center justify-start rounded-xl bg-slate-50 ring-8 ring-slate-200/70 dark:bg-stone-900 dark:ring-stone-700/70"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="animate close-button absolute top-2 right-2 text-2xl"
          onClick={() => {
            setLinkSettingsOpen(false);
          }}
        >
          <AiFillCloseCircle />
        </button>
        <h4 className="mt-5 text-2xl font-semibold text-slate-400 dark:text-stone-500">
          Link Options
        </h4>
        <div className="mt-2 flex h-full flex-col items-center justify-center space-y-5 p-5">
          <input
            type="text"
            className="text-input"
            placeholder="Custom Link"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
          />
          {/* TODO: ADD ONE TIME USE */}
          {/* <div className="flex items-center space-x-2">
                  <p className="text-md text-slate-400">One Time Use?</p>
                  <button onClick={() => setOneTimeUse(!oneTimeUse)}>
                    <AiFillCheckCircle
                      className={`${
                        oneTimeUse
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-cyan-200"
                      } animate text-2xl text-slate-300`}
                    />
                  </button>
                </div> */}
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default LinkOptionsModal;
