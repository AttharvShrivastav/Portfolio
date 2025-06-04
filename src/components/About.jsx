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

  // Fade in about container
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

  // Animate Download Resume hover
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
    <div className="h-[110vh] z-0 bg-[#C8C8C8] cursor-none relative">
      <h2
        ref={hiRef}
        className="text-6xl font-SpaceGrotesk font-medium tracking-tighter p-20 pb-2 opacity-0"
      >
        Hi, I'm
      </h2>

      <div
        ref={h1TargetRef}
        className="h-[100px] z-1 w-[300px] absolute top-38 left-16"
      >
        {/* This is where the h1 will land */}
      </div>


      <div className="p-20 mt-2">
  <h2 ref={devRef} className="text-6xl tracking-tighter font-medium text-black">
    <TypewriterComponent
      options={{
        strings: ["A Software Developer", "A Frontend Developer", "A Technology Enthusiast"],
        autoStart: true,
        loop: true,
        cursor: "_",
        delay: 60,
        deleteSpeed: 30,
      }}
    />
  </h2>
</div>

      <div
        ref={aboutRef}
        className="absolute flex flex-col opacity-0 bottom-25 right-40 w-[40vw] min-h-[60vh] p-10"
      >
        {/* <div className="w-full flex gap-10 p-4 h-full">
          <h3
            className="text-3xl font-Poppins font-600"
            ref={downloadRef}
            onMouseEnter={() => setDownloadHover(true)}
            onMouseLeave={() => setDownloadHover(false)}
          >
            Download Resume
          </h3>
        </div> */}

        {/* Optional toggle section */}
        <AboutToggle />
      </div>
    </div>
  );
}

export default About;
