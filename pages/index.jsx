import { linkSettingsOpenState } from "../atoms/linkSettingsOpenState";
import LinkOptionsModal from "../components/LinkOptionsModal";
import TopRightButtons from "../components/TopRightButtons";
import { cardsOpenState } from "../atoms/cardsOpenState";
import LinkClipboard from "../components/LinkClipboard";
import { AnimatePresence, motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";
import { Backdrop } from "../components/Backdrop";
import { navbarState } from "../atoms/navbarAtom";
import { linksState } from "../atoms/linksState";
import { RiArrowUpSLine } from "react-icons/ri";
import { useSwipeable } from "react-swipeable";
import { BsArchiveFill } from "react-icons/bs";
import MainLogo from "../components/MainLogo";
import * as Monkey from "monkey-typewriter";
import { BASE_URL } from "../utils/config";
import { FiCopy } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { useTheme } from "next-themes";
import Form from "../components/Form";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  // !GLOBAL
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);
  const [cardsOpen, setCardsOpen] = useRecoilState(cardsOpenState);
  const [links, setLinks] = useRecoilState(linksState);
  const [linkSettingsOpen, setLinkSettingsOpen] = useRecoilState(
    linkSettingsOpenState
  );

  // !LOCAL
  const [magnetLink, setMagnetLink] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [oneTimeUse, setOneTimeUse] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [locked, setLocked] = useState(false);
  const [customSlug, setCustomSlug] = useState("");

  useEffect(() => {
    const linksInStorage = JSON.parse(localStorage.getItem("links")) || [];
    setLinks(linksInStorage);
  }, [localStorage]);

  // !FUNCTIONS
  const generateSlug = async () => {
    let slug = Monkey.word();
    await axios
      .post(BASE_URL + "/api/available", { slug: slug })
      .then((response) => {
        if (response.status !== 200) {
          return generateSlug();
        }
      });

    return slug;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputLink);
    if (outputLink.length > 1) {
      toast.info("Copied link to clipboard, happy pasting :)", {
        position: "top-center",
        autoClose: "10000",
        hideProgressBar: false,
        newestOnTop: true,
        closeOnClick: true,
        theme: "colored",
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
      });
    }
  };

  // !HANDLER FUNCTIONS
  const handlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.event.target.id === "no-swipe" && magnetLink.length > 1) return;
      if (linkSettingsOpen) return;
      setCardsOpen(true);
    },
    onSwipedLeft: (e) => {
      if (e.event.target.id === "no-swipe" && magnetLink.length > 1) return;
      if (linkSettingsOpen) return;
      setNavbarOpen(true);
    },
  });

  const handleScroll = (e) => {
    if (e.deltaY > 0 && !linkSettingsOpen) {
      setCardsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (locked && password === "") {
      toast.warn("Please enter a password to unlock the link");
      return;
    }

    if (!locked) {
      setPassword("");
    }

    const loadingToast = toast.loading("Hold on, lighting up your link...");
    const slug = await generateSlug();

    const customOrDefaultSlug = customSlug.length == 0 ? slug : customSlug;

    await axios
      .post(BASE_URL + "/api/create", {
        slug: customOrDefaultSlug,
        password: locked ? password : "",
        link: magnetLink,
      })
      .then((response) => {
        setOutputLink(BASE_URL + "/" + customOrDefaultSlug);

        // SAVE LINK IN LOCAL STORAGE
        const linksInStorage = JSON.parse(localStorage.getItem("links")) || [];
        linksInStorage.push({
          link: BASE_URL + "/" + customOrDefaultSlug,
          password: locked ? password : "",
        });
        localStorage.setItem("links", JSON.stringify(linksInStorage));

        // SET LINKS STATE
        setLinks(linksInStorage);
        // SHOW TOAST
        toast.update(loadingToast, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          position: "top-center",
          autoClose: "3000",
          hideProgressBar: true,
          newestOnTop: true,
          closeOnClick: true,
          theme: "colored",
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
        copyToClipboard();
      })
      .catch((error) => {
        toast.update(loadingToast, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          position: "top-center",
          autoClose: "3000",
          hideProgressBar: true,
          newestOnTop: true,
          closeOnClick: true,
          theme: "colored",
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div
      className={`${
        navbarOpen || cardsOpen ? "scale-90 blur-3xl" : "scale-100 blur-none"
      } animate flex h-screen flex-col items-center justify-center gap-y-10 overflow-hidden bg-slate-50 dark:bg-stone-900`}
      onWheel={handleScroll}
      {...handlers}
    >
      <TopRightButtons
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        cardsOpen={cardsOpen}
      />
      <AnimatePresence exitBeforeEnter>
        {linkSettingsOpen && (
          <LinkOptionsModal
            customSlug={customSlug}
            setCustomSlug={setCustomSlug}
            linkSettingsOpen={linkSettingsOpen}
            setLinkSettingsOpen={setLinkSettingsOpen}
          />
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-y-10 ">
          <MainLogo />
          <Form
            locked={locked}
            setLocked={setLocked}
            handleSubmit={handleSubmit}
            password={password}
            setPassword={setPassword}
            magnetLink={magnetLink}
            setMagnetLink={setMagnetLink}
            setLinkSettingsOpen={setLinkSettingsOpen}
          />
        </div>
        <LinkClipboard
          outputLink={outputLink}
          copyToClipboard={copyToClipboard}
        />
      </div>

      {/* LIT LINKS BUTTON */}
      {/* DESKTOP */}
      <button
        className="invisible absolute bottom-5 flex flex-col items-center justify-center font-medium text-slate-400 dark:text-stone-400 sm:visible"
        onClick={() => {
          setCardsOpen(!cardsOpen);
        }}
      >
        <RiArrowUpSLine className="text-3xl" />
        Lit Links
      </button>

      {/* MOBILE */}
      <button
        className={`${
          navbarOpen || cardsOpen
            ? "scale-0 opacity-0"
            : "scale-100 opacity-100"
        } animate visible absolute top-5 left-5 z-10 rounded-sm text-xl text-slate-400 hover:text-blue-500 dark:text-stone-400 sm:invisible md:text-3xl`}
        onClick={() => {
          setCardsOpen(!cardsOpen);
        }}
      >
        <BsArchiveFill />
      </button>

      {/* TOASTIFY */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2}
      />
    </div>
  );
}
