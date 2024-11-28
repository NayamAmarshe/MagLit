import Head from "next/head";
import Header from "@/components/sections/header";
import Features from "@/components/sections/features";
import Community from "@/components/sections/community";
import Faq from "@/components/sections/faq";
import Pricing from "@/components/sections/pricing";
import Footer from "@/components/footer";

const HomePage = () => {
  return (
    <main className="max-w-screen relative z-0 flex h-full min-h-screen w-full snap-both snap-proximity flex-col overflow-y-scroll">
      <Head>
        <title>thiss.link - Link Shortener</title>
        <meta name="description" content="Simple and fast URL shortener" />
      </Head>

      <Header />
      {/* <section
        id="start"
        className="starfield relative z-0 flex h-screen w-full shrink-0 snap-center snap-always flex-col items-center justify-center"
      >
        <motion.div
          className="z-10 w-full max-w-md space-y-8"
          variants={fadeInAnimation}
          initial="hidden"
          animate="visible"
        >
          <LogoSVG className="h-full w-full text-text" />
          <LinkForm />
        </motion.div>
      </section> */}
      <Features />
      <Community />
      <Faq />
      <Pricing />
      <Footer />
    </main>
  );
};

export default HomePage;
