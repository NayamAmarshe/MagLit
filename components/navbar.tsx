import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthChecked(true);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="dark:border-darkNavBorder m500:h-16 fixed left-0 top-0 z-20 mx-auto flex h-[88px] w-full items-center border-b-4 border-border bg-white/80 px-5 backdrop-blur-3xl dark:bg-secondaryBlack ">
      <div className="mx-auto flex w-[1500px] max-w-full items-center justify-between text-text dark:text-darkText">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <span className="m900:w-[unset] m500:text-xl text-[33px] font-heading">
              thiss.link
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {!isAuthChecked ? null : auth.currentUser ? (
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2 rounded-lg px-2 py-2 transition-colors"
              >
                Sign Out
                {auth.currentUser.photoURL && (
                  <img
                    referrerPolicy="no-referrer"
                    src={auth.currentUser.photoURL}
                    alt="Profile"
                    className="h-6 w-6 rounded-full"
                  />
                )}
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
