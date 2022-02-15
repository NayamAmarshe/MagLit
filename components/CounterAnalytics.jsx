import React, { useEffect } from "react";
import Head from "next/head";

const CounterAnalytics = () => {
  useEffect(() => {
    if (
      !sessionStorage.getItem("_swa") &&
      document.referrer.indexOf(location.protocol + "//" + location.host) !== 0
    ) {
      fetch(
        "https://counter.dev/track?" +
          new URLSearchParams({
            referrer: document.referrer,
            screen: screen.width + "x" + screen.height,
            user: "maglit-admin@protonmail.com",
            utcoffset: "6",
          })
      );
    }
    sessionStorage.setItem("_swa", "1");
  }, []);

  return (
    <div>
      <Head></Head>
    </div>
  );
};

export default CounterAnalytics;
