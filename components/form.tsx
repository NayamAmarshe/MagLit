import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHandPointRight, FaLock, FaUnlock, FaWrench } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { popInAnimation } from "@/lib/motion";

const LinkForm = () => {
  const [url, setUrl] = useState("");
  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shortening URL:", url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div
        className="flex flex-col gap-3"
        variants={popInAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="z-10 flex gap-2" variants={popInAnimation}>
          <Input
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter link here..."
            required
          />
        </motion.div>

        <AnimatePresence mode="popLayout">
          {isLocked && (
            <motion.div
              variants={popInAnimation}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  duration: 0.2,
                },
              }}
            >
              <Input
                type="password"
                className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password here..."
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={popInAnimation} className="z-10 flex gap-2">
          <Button
            type="submit"
            className="starfield-origin h-12 w-full text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            size="lg"
          >
            <FaHandPointRight className="mr-2" /> squish thiss link
          </Button>
          <Button
            variant="neutral"
            size="lg"
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
          >
            <FaWrench />
          </Button>
          <Button
            size="lg"
            type="button"
            className="h-12 text-base font-heading md:text-lg lg:h-14 lg:text-xl"
            variant={isLocked ? "default" : "neutral"}
            onClick={() => setIsLocked(!isLocked)}
          >
            {isLocked ? <FaLock /> : <FaUnlock />}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default LinkForm;
