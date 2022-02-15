import React from "react";

const Modal = () => {
  return (
    <div className="absolute top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="animate-popup h-1/2 w-1/2 rounded-xl bg-white"></div>
    </div>
  );
};

export default Modal;
