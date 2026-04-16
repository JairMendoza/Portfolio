import { Helmet } from "react-helmet-async";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Hobbies from "@/components/sections/Hobbies";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Jair Mendoza | Full Stack Developer</title>
        <meta
          name="description"
          content="Portfolio of Jair Mendoza, Full Stack Developer specializing in React, Node.js and modern web technologies. Available for freelance projects."
        />
        <meta name="theme-color" content="#0a0a0a" />
      </Helmet>

      <div className="flex flex-col gap-10 md:gap-16 pb-10">
        <Hero />
        <About />
        <Stack />
        <Hobbies />
      </div>
    </>
  );
}
