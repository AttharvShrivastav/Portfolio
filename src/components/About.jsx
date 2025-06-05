import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutToggle from "./AboutToggle";
import TypewriterComponent from "typewriter-effect";

gsap.registerPlugin(ScrollTrigger);

function About({ h1TargetRef }) {
  const [downloadHover, setDownloadHover] = useState(false);

  const hiRef = useRef(null);
  const devRef = useRef(null);
  const aboutRef = useRef(null);
  const downloadRef = useRef(null);

  useEffect(() => {
    if (!hiRef.current || !devRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [hiRef.current, devRef.current],
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.in",
          scrollTrigger: {
            trigger: h1TargetRef.current,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [h1TargetRef]);

  useEffect(() => {
    if (!aboutRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: "top center",
        onEnter: () => {
          gsap.to(aboutRef.current, {
            opacity: 1,
            duration: 1,
          });
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!downloadRef.current) return;

    const el = downloadRef.current;

    if (downloadHover) {
      gsap.to(el, { color: "#FF5F00", scale: 1.1 });
      window.dispatchEvent(new Event("Download-button-hover-on"));
    } else {
      gsap.to(el, { color: "#000", scale: 1 });
      window.dispatchEvent(new Event("Download-button-hover-off"));
    }
  }, [downloadHover]);

  return (
    <div
      id="about"
      className="min-h-[110vh] z-0 flex flex-col bg-[#C8C8C8] cursor-none relative px-6 sm:px-12 md:px-20"
    >
      <div className="">
      <h2
        ref={hiRef}
        className="text-4xl sm:text-5xl md:text-6xl font-SpaceGrotesk font-medium tracking-tighter pt-12 sm:pb-14 md:pb-32 pb-2 opacity-0"
      >
        Hi, I'm
      </h2>
      {/* Target position container, moved responsively */}
      <div
  ref={h1TargetRef}
  className="absolute left-[1rem] sm:left-[4rem] z-10
             top-[7.5rem] sm:top-[10rem]
             w-[80vw] sm:w-[300px]
             h-[100px]"
>
  {/* h1 moves here */}
</div>
      <div className="mt-24 sm:mt-8">
  <h2
    ref={devRef}
    className="mt-4 sm:mt-6 text-3xl sm:text-5xl md:text-6xl tracking-tighter font-medium text-black"
  >
    <TypewriterComponent
      options={{
        strings: [
          "A Software Developer",
          "A Frontend Developer",
          "A Technology Enthusiast",
        ],
        autoStart: true,
        loop: true,
        cursor: "_",
        delay: 60,
        deleteSpeed: 30,
      }}
    />
  </h2>
</div>
</div>


      {/* About panel — repositioned for responsiveness */}
      <div
        ref={aboutRef}
        className="absolute justify-end flex opacity-0 bottom-8 sm:bottom-16 right-2 sm:right-20 w-[90vw] sm:w-[70vw] md:bottom-6 md:w-[70vw] min-h-[50vh] sm:min-h-[60vh] p-4 sm:p-6 md:p-10"
      >
        <AboutToggle />
      </div>
    </div>
  );
}

export default About;
