import { useRecoilState } from "recoil";
import { navbarState } from "../atoms/navbarAtom";
import { BsFillGridFill } from "react-icons/bs";
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useRecoilState(navbarState);

  return (
    <div
      className={`${
        navbarOpen ? "overflow-x-hidden" : "overflow-hidden"
      } animate relative bg-slate-50`}
    >
      <Navbar />
      <main>
        <button
          className={`${
            navbarOpen ? "scale-0" : "scale-100"
          } animate absolute top-5 right-5 z-10 text-xl text-slate-400 hover:text-blue-500 focus:text-blue-500 md:text-3xl`}
          onClick={() => {
            setNavbarOpen(!navbarOpen);
          }}
        >
          <BsFillGridFill />
        </button>
        {children}
      </main>
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="maglit"
        data-description="Support me on Buy me a coffee!"
        data-color="#FFDD00"
        data-position="Right"
        data-x_margin="18"
        data-y_margin="18"
      ></script>
    </div>
  );
};

export default Layout;
