import Marquee from "react-fast-marquee";

export default function Features() {
  const features = [
    {
      title: "It's a link shortener",
      text: "I'm not sure what else you expect but yeah, it's a pretty simple and fast link shortener. I made it myself ☺️",
    },
    {
      title: "It's a free (and open source), Mario!",
      text: "It's free and open source, so you can use it for whatever you want. If you want to support me, you can buy me a coffee though (I don't drink coffee 🤫)",
    },
    {
      title: "Passwords! Passwords! Passwords!",
      text: "You can set a password for your links, so that only you can access them. Tell me if that isn't enough to make you happy for whatever reason 🤷🏻‍♂️",
    },
    {
      title: "It's secure 😎",
      text: "All the password protected links are encrypted hehe. This means that you're safe, you're secure, you're protected 🤗",
    },
    {
      title: "It's beautiful!",
      text: "What do you mean you don't like the UI design? 😰",
    },
    {
      title: "I've run out of things to say...",
      text: "I need ideas, please! 😭",
    },
  ];

  return (
    <div className="snap-start snap-always">
      <section className="border-t-2 border-t-border bg-bg py-20 font-base dark:border-t-darkBorder dark:bg-darkBg lg:py-[100px]">
        <h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Features? Yeah I&apos;ll show you features!
        </h2>

        <div className="w-container mx-auto grid max-w-full grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            return (
              <div
                className="flex flex-col gap-3 rounded-base border-2 border-border bg-white p-5 shadow-light dark:border-darkBorder dark:bg-secondaryBlack dark:shadow-dark"
                key={i}
              >
                <h4 className="text-xl font-heading">{feature.title}</h4>
                <p>{feature.text}</p>
              </div>
            );
          })}
        </div>
      </section>
      <div>
        <Marquee
          className="border-y-2 border-y-border bg-white py-3 font-base dark:border-darkBorder dark:border-y-darkBorder dark:bg-secondaryBlack sm:py-5"
          direction="left"
        >
          {Array(10)
            .fill("xd")
            .map((x, id) => {
              return (
                <div className="flex items-center" key={id}>
                  <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
                    thiss.link
                  </span>
                </div>
              );
            })}
        </Marquee>
      </div>
    </div>
  );
}
