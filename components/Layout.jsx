import GridLoader from "react-spinners/GridLoader";
import { navbarState } from "../atoms/navbarAtom";
import { BsFillGridFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ScrollingCards from "./ScrollingCards";

const Layout = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        <div className="animate relative overflow-hidden bg-slate-50">
          <Navbar />
          {/* LINKS CARDS */}
          <ScrollingCards />

          <main>{children}</main>
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
