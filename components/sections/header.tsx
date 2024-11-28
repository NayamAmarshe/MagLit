import { fadeInAnimation, popInAnimation } from "@/lib/motion";
import LinkForm from "../form";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header
      variants={popInAnimation}
      initial="hidden"
      animate="visible"
      className="inset-0 flex h-screen w-full snap-start snap-always flex-col items-center justify-center gap-4 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] dark:bg-secondaryBlack"
    >
      <motion.div className="flex flex-col items-center justify-center gap-6 text-center">
        <motion.img
          src="/logo.svg"
          alt="logo"
          className="w-full max-w-[440px]"
        />
        <motion.p className="text-lg font-normal leading-relaxed md:text-xl lg:text-2xl lg:leading-relaxed">
          Free and Open Source Link Shortener
        </motion.p>
        <LinkForm />
      </motion.div>
    </motion.header>
  );
}
