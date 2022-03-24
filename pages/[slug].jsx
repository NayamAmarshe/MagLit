import { toast, ToastContainer } from "react-toastify";
import PasswordForm from "../components/PasswordForm";
import { navbarState } from "../atoms/navbarAtom";
import { BsFillGridFill } from "react-icons/bs";
import { useSwipeable } from "react-swipeable";
import MainLogo from "../components/MainLogo";
import { BASE_URL } from "../utils/config";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useState } from "react";
import axios from "axios";

const RedirectPage = ({ slug }) => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);
  const handlers = useSwipeable({
    onSwipedLeft: (e) => {
      setNavbarOpen(true);
    },
  });

  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(BASE_URL + "/api/verify", { slug, password })
      .then((response) => {
        router.push(response.data.linkData.link);
      })
      .catch((error) => {
        toast.error("Wrong Password");
      });
  };

  return (
    <div
      className={`${
        navbarOpen ? "scale-90" : "scale-100"
      } animate flex h-screen flex-col items-center justify-center gap-y-10 overflow-hidden bg-slate-50`}
    >
      {/* MENU LINK */}
      <button
        className={`${
          navbarOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } animate absolute top-5 right-5 z-10 rounded-sm bg-slate-50 text-xl text-slate-400 hover:text-blue-500 md:text-3xl`}
        onClick={() => {
          setNavbarOpen(!navbarOpen);
        }}
      >
        <BsFillGridFill />
      </button>

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

      <div className="flex w-full flex-col gap-y-10 items-center justify-center">
        <MainLogo />
        <PasswordForm
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RedirectPage;

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  let responseData;
  let isProtected = false;

  // get axios response, verify slug
  await axios
    .post(BASE_URL + "/api/verify", {
      slug: slug,
      password: "",
    })
    .then((response) => {
      // save response data
      responseData = response.data;
    })
    .catch((error) => {
      // save response data
      responseData = error.response.data;
      // check if link is protected
      isProtected = error.response.data.linkData.protected;
    });

  // if returned link is empty, then 404
  if (responseData.linkData.link.length < 1) {
    return {
      notFound: true,
    };
  }

  // if link is protected, input password
  if (isProtected) {
    return {
      props: {
        slug,
      },
    };
  } else {
    // if link isn't protected, redirect
    return {
      redirect: {
        destination: responseData.linkData.link,
        permanent: false,
      },
    };
  }
}
