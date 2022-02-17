import Image from "next/image";
import React from "react";

const BMCButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/maglit"
      className="absolute bottom-2 right-2 h-10 w-10 md:bottom-5 md:right-5 md:h-16 md:w-16 "
    >
      <Image src="/bmc.svg" layout="fill" />
    </a>
  );
};

export default BMCButton;
