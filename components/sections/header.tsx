import { popInAnimation } from "@/lib/motion";
import LinkForm from "../form";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Header() {
  const [creatingLink, setCreatingLink] = useState(false);

  return (
    <motion.header
      variants={popInAnimation}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex h-screen w-full snap-start snap-always flex-col items-center justify-center gap-4 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-secondaryBlack",
      )}
    >
      {/* Content */}
      <motion.div className="relative z-10 flex max-w-[500px] flex-col items-center justify-center gap-6 text-center">
        <motion.div className="flex flex-col items-center justify-center gap-2">
          <motion.img
            src="/logo.svg"
            alt="logo"
            className={cn(
              "w-full transition-transform duration-500 ease-in-out dark:opacity-95 dark:invert",
              creatingLink && "scale-95",
            )}
          />
          <motion.span className="inline-block -rotate-1 bg-mainAccent px-2">
            <motion.p
              className={cn(
                "rotate-1 text-lg font-bold leading-relaxed transition-opacity duration-500 dark:text-mainAccent md:text-xl lg:text-2xl lg:leading-relaxed",
              )}
            >
              Free and Open Source Link Shortener
            </motion.p>
          </motion.span>
        </motion.div>

        <LinkForm
          creatingLink={creatingLink}
          setCreatingLink={setCreatingLink}
        />
      </motion.div>
    </motion.header>
  );
}
