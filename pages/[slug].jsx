import TopRightButtons from "../components/home/TopRightButtons";
import { toast, ToastContainer } from "react-toastify";
import PasswordForm from "../components/home/PasswordForm";
import { navbarState } from "../atoms/navbarAtom";
import { BsFillGridFill } from "react-icons/bs";
import { useSwipeable } from "react-swipeable";
import MainLogo from "../components/home/MainLogo";
import { BASE_URL } from "../utils/config";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { StatusCodes } from "http-status-codes";

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

    await fetch(BASE_URL + "api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, password }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((response) => {
            throw new Error(response.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        router.push(data?.linkData?.link);
      })
      .catch((error) => {
        console.log("🚀 => file: [slug].jsx:61 => error", error);
        toast.error(error.message);
      });
  };

  return (
    <div
      className={`${
        navbarOpen ? "scale-90 blur-lg" : "scale-100 blur-none"
      } animate flex h-screen flex-col items-center justify-center gap-y-10 overflow-hidden bg-slate-50 dark:bg-stone-900`}
    >
      <TopRightButtons
        navbarOpen={navbarOpen}
        setNavbarOpen={setNavbarOpen}
        cardsOpen={false}
      />

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

      <div className="flex w-full flex-col items-center justify-center gap-y-10">
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
  let isProtected = false;
  let notFound = false;
  let link = "";

  await fetch(BASE_URL + "api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: slug,
      password: "",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        switch (response.status) {
          case StatusCodes.NOT_FOUND:
            notFound = true;
            break;
          case StatusCodes.UNAUTHORIZED:
            isProtected = true;
            break;
        }
      } else {
        return response.json();
      }
    })
    .then((data) => {
      link = data?.linkData?.link;
    })
    .catch((error) => {
      console.log("🚀 => file: [slug].jsx:137 => error", error);
    });

  if (notFound) {
    return {
      notFound: true,
    };
  }

  // if link is protected, input password
  if (isProtected) {
    context.res.setHeader("Cache-Control", "s-maxage=176400");
    return {
      props: {
        slug,
      },
    };
  } else {
    // if link isn't protected, redirect
    context.res.setHeader("Cache-Control", "s-maxage=176400");
    return {
      redirect: {
        destination: link,
        permanent: false,
      },
    };
  }
}
