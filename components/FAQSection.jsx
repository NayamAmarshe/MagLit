import MenuCard from "./MenuCard";
import React from "react";

const FAQSection = () => {
  return (
    <>
      <p className="mt-20 pb-4 text-center text-2xl font-bold text-slate-600">
        FAQ🧐
        <p className="text-slate-400 text-sm">(Scroll to read more)</p>
      </p>
      <div className="mb-10 w-full flex h-[70vh] flex-col items-center gap-5 overflow-y-scroll py-5 pb-10 md:gap-10">
        <MenuCard
          heading="The hell is this? 🤔"
          content={[
            "MagLit is an encrypted and privacy respecting Link Shortener service that supports not only your regular website links but also Magnet Links which are extensively used to download and share torrents.",
            <br key={1}></br>,
            <br key={2}></br>,
            <i key={3}>
              <b key={4}>
                MagLit admins cannot ever see what links you light up once you
                encrypt them using your own secret key.
              </b>
            </i>,
          ]}
          bgColor="bg-green-100/40"
          shadowColor="shadow-green-200"
          hoverShadowColor="hover:shadow-green-200"
        />
        <MenuCard
          heading="Is it open-source? 🌚"
          content={[
            <b key={1}>Yes 100%</b>,
            <br key={2}></br>,
            "MagLit is a totally free and open source service licensed under AGPLv3. All your requests are proxied through a server and no personal data is ever stored. You can check out the source code on GitHub if you want 😉",
          ]}
          bgColor="bg-purple-100/40"
          shadowColor="shadow-purple-200"
          hoverShadowColor="hover:shadow-purple-200"
        />
        <MenuCard
          heading="My adblock detected a tracker! 🤥"
          content={[
            "Don't worry, MagLit uses",
            <a
              key={1}
              className="font-bold text-blue-400"
              href="https://counter.dev"
            >
              {" "}
              Counter.Dev Analytics <br></br>
            </a>,
            "Your IP is not logged, no cookies are stored, no fingerprinting data is used to spy on you. It just helps us know what countries are accessing maglit.ml and what different screen sizes are accessing this website. It can help us optimize the website layout better. Still, if you don't want to share your screen size and country, please feel free to block the script using your adblocker.",
          ]}
          bgColor="bg-cyan-100/40"
          shadowColor="shadow-cyan-200"
          hoverShadowColor="hover:shadow-cyan-200"
        />
        <MenuCard
          heading="Like the project? 👍"
          content={[
            "You can buy me a coffee by tipping some",
            <b key={1}> BATs </b>,
            "from your Brave Browser or",
            <a
              key={2}
              href="https://buymeacoffee.com/maglit"
              className="text-blue-400 font-bold"
            >
              {" "}
              BMAC{" "}
            </a>,
          ]}
          bgColor="bg-red-100/40"
          shadowColor="shadow-red-200"
          hoverShadowColor="hover:shadow-red-200"
        />
      </div>
    </>
  );
};

export default FAQSection;
