import GridLoader from "react-spinners/GridLoader";
import { navbarState } from "../atoms/navbarAtom";
import { BsFillGridFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <GridLoader loading={loading} size={15} color={"#ff8100"} />
        </div>
      ) : (
        <div
          className={`${
            navbarOpen ? "bg-yell overflow-x-hidden" : "overflow-hidden"
          } animate relative bg-slate-50`}
        >
          <Navbar />
          <main>
            <button
              className={`${
                navbarOpen ? "scale-0" : "scale-100"
              } animate absolute top-5 right-5 z-10 rounded-sm bg-slate-50 text-xl text-slate-400 hover:text-blue-500 focus:text-blue-500 md:text-3xl`}
              onClick={() => {
                setNavbarOpen(!navbarOpen);
              }}
            >
              <BsFillGridFill />
            </button>
            {children}
          </main>
          <script
            defer
            data-name="BMC-Widget"
            data-cfasync="false"
            src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
            data-id="maglit"
            data-description="Support me on Buy me a coffee!"
            data-message="Hi, Welcome to MagLit!"
            data-color="#FFDD00"
            data-position="Right"
            data-x_margin="18"
            data-y_margin="18"
          ></script>
        </div>
      )}
    </>
  );
};

export default Layout;
