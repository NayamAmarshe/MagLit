import { BsFillGridFill, BsArchiveFill } from "react-icons/bs";
import TopRightButtons from "../components/TopRightButtons";
import { cardsOpenState } from "../atoms/cardsOpenState";
import { toast, ToastContainer } from "react-toastify";
import { navbarState } from "../atoms/navbarAtom";
import { linksState } from "../atoms/linksState";
import { RiArrowUpSLine } from "react-icons/ri";
import { useSwipeable } from "react-swipeable";
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

  // !LOCAL
  // const [showEditSlug, setShowEditSlug] = useState(false);
  const [magnetLink, setMagnetLink] = useState("");
  const [outputLink, setOutputLink] = useState("");
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [locked, setLocked] = useState(false);
  // const [slug, setSlug] = useState("");

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
      setCardsOpen(true);
    },
    onSwipedLeft: (e) => {
      setNavbarOpen(true);
    },
  });

  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      setCardsOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (locked && password === "") {
      toast.warn("Please enter a password to unlock the link");
      return;
    }

    const loadingToast = toast.loading("Hold on, lighting up your link...");
    const slug = await generateSlug();

    await axios
      .post(BASE_URL + "/api/create", {
        slug,
        password,
        link: magnetLink,
      })
      .then((response) => {
        setOutputLink(BASE_URL + "/" + slug);
        // SAVE LINK IN LOCAL STORAGE
        const linksInStorage = JSON.parse(localStorage.getItem("links")) || [];
        linksInStorage.push(BASE_URL + "/" + slug);
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
        navbarOpen || cardsOpen ? "scale-90" : "scale-100"
      } animate flex h-screen flex-col items-center justify-center gap-y-10 overflow-hidden bg-slate-50 dark:bg-black`}
      onWheel={handleScroll}
      {...handlers}
    >
      <TopRightButtons
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        cardsOpen={cardsOpen}
      />
      {/* MAIN CONTENT */}
      <div className="fixed top-0 flex h-screen flex-col items-center justify-center">
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
            // showEditSlug={showEditSlug}
            // setShowEditSlug={setShowEditSlug}
            // slug={slug}
            // setSlug={setSlug}
          />
        </div>
        <button
          onClick={copyToClipboard}
          className={
            outputLink.length > 1
              ? `animate relative mx-auto mt-7 flex h-10 w-11/12 items-center justify-center truncate rounded-xl bg-green-300 py-10 text-green-800 hover:cursor-pointer hover:shadow-inner hover:shadow-green-500 focus:shadow-inner focus:shadow-green-400`
              : `animate relative flex h-0 scale-y-0 items-center justify-center truncate`
          }
        >
          <h1 className="w-[70%] truncate">{outputLink}</h1>
          <FiCopy className="right-10" />
        </button>
      </div>
      {/* LIT LINKS BUTTON */}
      {/* DESKTOP */}
      <button
        className="absolute bottom-5 flex flex-col items-center justify-center font-medium text-slate-400 invisible sm:visible"
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
        } animate absolute top-5 left-5 z-10 rounded-sm text-xl text-slate-400 hover:text-blue-500 md:text-3xl visible sm:invisible`}
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
