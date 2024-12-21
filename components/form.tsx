import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaHandPointRight, FaLock, FaSpinner, FaUnlock } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { popInAnimation } from "@/lib/motion";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "./ui/toast";
import type {
  CreateLinkRequest,
  CreateLinkResponse,
} from "../pages/api/link/create/index";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import LinkOptionsDialog from "./header/link-options";
import { useAtomValue } from "jotai";
import { linkExpiryAtom } from "./atoms/user-settings";
import useUser from "./hooks/use-user";

const LinkForm = ({
  creatingLink,
  setCreatingLink,
}: {
  creatingLink: boolean;
  setCreatingLink: (value: boolean) => void;
}) => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const linkExpiry = useAtomValue(linkExpiryAtom);

  // Get firebase userId
  const [userId, setUserId] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (auth.currentUser) {
      setUserId(auth.currentUser.uid);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingLink(true);
    const urlRegex = /^(https?:\/\/|ftp:\/\/|magnet:\?).+/i;
    if (!urlRegex.test(url)) {
      toast({
        title: "Invalid URL",
        description:
          "URL must start with http://, https://, ftp://, or magnet:?",
        action: <ToastAction altText="Got it">Got it</ToastAction>,
      });
      return;
    }
    // Add artificial delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    try {
      const response = await fetch("/api/link/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          password,
          userId: user?.uid,
          slug: slug,
          expiry: linkExpiry,
        } as CreateLinkRequest["body"]),
      });
      const responseData: CreateLinkResponse = await response.json();

      toast({
        title: "Success",
        description: "Link has been created",
        action: <ToastAction altText="Got it">Got it</ToastAction>,
      });
      console.log("🚀 => responseData:", responseData);
      if (responseData.status === "error") {
        throw new Error(responseData.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        action: <ToastAction altText="Got it">Got it</ToastAction>,
      });
    } finally {
      setCreatingLink(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[900px]">
      <motion.div
        className="flex w-full flex-col gap-3"
        variants={popInAnimation}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="z-10 flex w-full gap-2"
          variants={popInAnimation}
        >
          <Input
            className="h-12 w-full text-base font-heading md:text-lg lg:h-14 lg:text-xl"
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
            className={cn(
              "h-12 w-full text-base font-heading md:text-lg lg:h-14 lg:text-xl",
              creatingLink &&
                "pointer-events-none translate-x-boxShadowX translate-y-boxShadowY shadow-none dark:shadow-none",
            )}
            size="lg"
            disabled={creatingLink}
          >
            {creatingLink ? (
              <FaSpinner className="mr-2 animate-spin" />
            ) : (
              <FaHandPointRight className="mr-2" />
            )}{" "}
            {!creatingLink ? "squish thiss link" : "squishing"}
          </Button>

          <LinkOptionsDialog slug={slug} setSlug={setSlug} />

          <Button
            size="lg"
            type="button"
            className="h-12 text-base font-heading dark:text-text md:text-lg lg:h-14 lg:text-xl"
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
