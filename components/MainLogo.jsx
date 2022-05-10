import Image from "next/image";
import Link from "next/link";

const MainLogo = () => {
  return (
    <Link href="/" passHref>
      <a className="flex w-full flex-col flex-wrap px-4 md:items-center">
        <h1 className="flex flex-wrap items-center pb-5 text-center text-6xl font-bold text-slate-400 md:justify-center xs:justify-center xs:text-8xl">
          Mag
          <div className="relative h-16 w-16 xs:h-24 xs:w-24">
            <Image layout="fill" src="/fire.png" alt="MagLit Logo" />
          </div>
          Lit
        </h1>
        <p className="text-center text-sm font-semibold text-slate-400/60 xs:text-base">
          Privacy Respecting Encrypted Link Shortener
        </p>
      </a>
    </Link>
  );
};

export default MainLogo;
