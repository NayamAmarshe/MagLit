import { motion } from "framer-motion";
import React from "react";

export const Backdrop = ({ children, onClickHandler }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/30 px-5 backdrop-blur-3xl"
      onClick={onClickHandler}
    >
      {children}
    </motion.div>
  );
};
