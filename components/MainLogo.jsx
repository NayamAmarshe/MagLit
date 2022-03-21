import Link from "next/link";

const MainLogo = () => {
  return (
    <Link href="/" passHref>
      <a className="gap-4md:items-center flex w-full flex-col flex-wrap px-4">
        <h1 className="xs:justify-center xs:text-8xl flex flex-wrap items-center pb-5 text-center text-6xl font-bold text-slate-400 md:justify-center">
          Mag
          <img src="/fire.png" className="xs:w-24 w-16" />
          Lit
        </h1>
        <p className="xs:text-base text-center text-sm font-semibold text-slate-400/60">
          Privacy Respecting Encrypted Link Shortener
        </p>
      </a>
    </Link>
  );
};

export default MainLogo;
