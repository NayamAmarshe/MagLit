import React from "react";

export const Backdrop = ({ children, onClickHandler }) => {
  return (
    <div
      className="absolute top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-black/30"
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};
