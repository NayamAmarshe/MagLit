import TopRightButtons from "../components/home/TopRightButtons";
import { toast, ToastContainer } from "react-toastify";
import PasswordForm from "../components/home/PasswordForm";
import { navbarState } from "../atoms/navbarAtom";
import { useSwipeable } from "react-swipeable";
import MainLogo from "../components/home/MainLogo";
import { BASE_URL } from "../utils/config";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import crypto from "crypto-js";

const RedirectPage = ({ slug }) => {
  const [navbarOpen, setNavbarOpen] = useAtom(navbarState);
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

  if (slug.length < 1) {
    return {
      notFound: true,
    };
  }

  const collectionName =
    process.env.NODE_ENV === "production" ? "links" : "testLinks";

  try {
    // check firebase if slug exists
    const documentRef = doc(db, collectionName, slug);
    const documentSnapshot = await getDoc(documentRef);

    if (!documentSnapshot.exists()) {
      // return 404 if slug doesn't exist
      context.res.setHeader("Cache-Control", "s-maxage=31536000, immutable");
      return {
        notFound: true,
      };
    } else {
      // get link details
      let isBlocked = false;
      const linkData = documentSnapshot.data();
      const { link } = linkData;
      isProtected = linkData.protected;
      isBlocked = linkData?.blocked;
      let decryptedLink = "";

      if (isBlocked === true) {
        context.res.setHeader("Cache-Control", "s-maxage=31536000, immutable");
        return {
          notFound: true,
        };
      }

      if (!isProtected) {
        const withoutPassword = process.env.SECRET_KEY;

        decryptedLink = crypto.AES.decrypt(link, withoutPassword).toString(
          crypto.enc.Utf8,
        );

        // check protected link
        if (decryptedLink.length < 1) {
          return {
            notFound: true,
          };
        }

        context.res.setHeader("Cache-Control", "s-maxage=31536000, immutable");
        return {
          redirect: {
            destination:
              (
                JSON.parse(decryptedLink) as {
                  link: string;
                }
              ).link || "",
            permanent: false,
          },
        };
      } else if (isProtected) {
        context.res.setHeader("Cache-Control", "s-maxage=31536000, immutable");
        return {
          props: {
            slug,
          },
        };
      }
    }
  } catch (error) {
    console.log("🚀 => file: [slug].jsx:137 => error", error);
    return {
      notFound: true,
    };
  }
}
