// import React, { useEffect, useState, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SplitType from "split-type";

// gsap.registerPlugin(ScrollTrigger);

// const socialLinks = [
//      {
//           name: "LinkedIn",
//           url: "https://linkedin.com/in/attharv-shrivastav",
//           tooltip: "Let's get professional",
//           iconClass: "ri-linkedin-line",
//      },
//      {
//           name: "GitHub",
//           url: "https://github.com/attharvshrivastav",
//           tooltip: "Peek under the hood",
//           iconClass: "ri-github-line",
//      },
//      {
//           name: "Email",
//           url: "mailto:shrivastav.atharv21@gmail.com",
//           tooltip: "Drop me a line",
//           iconClass: "ri-mail-line",
//      },
//      // {
//      //      name: "Phone",
//      //      url: "tel:+1234567890",
//      //      tooltip: "Ring ring!",
//      //      iconClass: "ri-phone-line",
//      // },
// ];

// export default function Footer() {
//      const [clickCount, setClickCount] = useState(0);
//      const [showToast, setShowToast] = useState(false);
//      const [darkMode, setDarkMode] = useState(false);

//      const socialRefs = useRef([]);
//      const footerNameRef = useRef(null);

//      // Scroll-based split text animation
//      useEffect(() => {
//           const split = new SplitType(footerNameRef.current, {
//                types: "words",
//           });

//           gsap.from(split.words, {
//                scrollTrigger: {
//                     trigger: footerNameRef.current,
//                     start: "top bottom",
//                },
//                opacity: 0,
//                y: 20,
//                stagger: 0.08,
//                duration: 0.6,
//                ease: "power2.out",
//           });

//           return () => split.revert();
//      }, []);

//      // Social icon hover glow
//      useEffect(() => {
//           socialRefs.current.forEach((el) => {
//                if (!el) return;
//                const onEnter = () =>
//                     gsap.to(el, {
//                          color: "#FF5F00",
//                          duration: 0.3,
//                     });
//                const onLeave = () =>
//                     gsap.to(el, {
//                          color: "",
//                          duration: 0.3,
//                     });

//                el.addEventListener("mouseenter", onEnter);
//                el.addEventListener("mouseleave", onLeave);
//           });
//      }, []);

//      // Easter egg
//      const handleCopyrightClick = () => {
//           setClickCount((prev) => {
//                const next = prev + 1;
//                if (next === 3) {
//                     setShowToast(true);
//                     setTimeout(() => setShowToast(false), 3000);
//                     return 0;
//                }
//                return next;
//           });
//      };


//      return (
//           <footer
//                id="contact"
//                className={`bg-page-bg relative font-sans transition-colors duration-300`}
//           >
//                {/* SVG Filter for sketch underline */}
//                <svg
//                     width="0"
//                     height="0"
//                >
//                     <filter id="wavy">
//                          <feTurbulence
//                               baseFrequency="0.05"
//                               numOctaves="3"
//                               result="noise"
//                          />
//                          <feDisplacementMap
//                               in="SourceGraphic"
//                               in2="noise"
//                               scale="3"
//                          />
//                     </filter>
//                </svg>

//                <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
//                     {/* SplitText heading */}
//                     <h2
//                          ref={footerNameRef}
//                          className="text-center text-6xl md:text-6xl font text-black font-SpaceGrotesk"
//                     >
//                          Attharv Shrivastav
//                     </h2>

//                     {/* Navigation Links */}
//                     <nav className="flex justify-center hover:text-accent-orange gap-10 font-medium text-base">
//                          {["About", "Projects", "Get in Touch"].map((label) => (
//                               <a
//                                    key={label}
//                                    href={`#${label
//                                         .toLowerCase()
//                                         .replace(/\s+/g, "-")}`}
//                                    className="relative group"
//                               >
//                                    <span
//                                         className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-accent-orange
//                            after:transition-all after:duration-300 group-hover:after:scale-x-100 after:scale-x-0 after:origin-left
//                            relative text-black text-2xl"
//                                         style={{ filter: "url(#wavy)" }}
//                                    >
//                                         {label}
//                                    </span>
//                               </a>
//                          ))}
//                     </nav>

//                     {/* Social Icons */}
//                     <div className="flex justify-center gap-6 text-2xl">
//                          {socialLinks.map(
//                               ({ name, url, tooltip, iconClass }, i) => (
//                                    <a
//                                         key={name}
//                                         href={url}
//                                         title={tooltip}
//                                         className="transition-colors duration-300"
//                                         ref={(el) =>
//                                              (socialRefs.current[i] = el)
//                                         }
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                    >
//                                         <i
//                                              className={`${iconClass} text-2xl`}
//                                         />
//                                    </a>
//                               )
//                          )}
//                     </div>

//                     {/* Signature line */}
//                     <p className="text-center text-sm italic font-[Poppins] text-gray-800 ">
//                          Crafted with coffee, code, and a sprinkle of curiosity.
//                     </p>

//                     {/* Bottom section */}
//                     <div className="flex justify-between items-center text-xs mt-8 text-gray-800 font-mono">
                         

//                          <span
//                               id="copyright"
//                               onClick={handleCopyrightClick}
//                               className="cursor-pointer"
//                          >
//                               © 2025 Attharv Shrivastav. All code and coffee
//                               reserved.
//                          </span>
//                     </div>
//                </div>

//                {/* Easter egg toast */}
//                {showToast && (
//                     <div className="fixed bottom-6 right-6 bg-accent-orange text-white px-4 py-2 rounded shadow-lg animate-fadeInOut">
//                          You found the secret footer! Here's a virtual high-five
//                          ✋
//                     </div>
//                )}

//                {/* Animation keyframes */}
//                <style>{`
//         @keyframes fadeInOut {
//           0% {opacity: 0; transform: translateY(10px);}
//           10% {opacity: 1; transform: translateY(0);}
//           90% {opacity: 1; transform: translateY(0);}
//           100% {opacity: 0; transform: translateY(10px);}
//         }
//         .animate-fadeInOut {
//           animation: fadeInOut 3s ease forwards;
//         }
//       `}</style>
//           </footer>
//      );
// }
import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // State to hold the current time
  const [time, setTime] = useState("");
  const container = useRef(null);

  // useEffect to update the time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(currentTime);
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  // useGSAP for the scroll-triggered animation
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Animation starts when the top of the footer is 80% from the top of the viewport
        toggleActions: "play none none none", // Play the animation once and don't reverse
      },
    });

    // Animate elements in sequence
    tl.from(".footer-headline", {
        y: "100%", // Start 100% of its own height down
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
      .from(".footer-cta", {
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)", // A nice "pop" effect
      }, "-=0.7") // Overlap with the previous animation
      .from(".footer-contact-item", {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2, // Animate each item with a small delay
      }, "-=0.5")
      .from(".footer-bottom", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5");

  }, { scope: container }); // Scope the GSAP selectors to the container ref

  const currentYear = new Date().getFullYear();

  return (
    // Add the ref to the main footer element
    <footer
      ref={container}
      className="w-full py-20 px-6 md:px-12"
      style={{ backgroundColor: "#c8c8c8" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 border-b-2 border-neutral-700 pb-12">
          {/* Add a wrapper and a class for the headline animation */}
          <div className="overflow-hidden">
            <h2 className="font-SpaceGrotesk text-5xl md:text-7xl  text-neutral-800 leading-tight footer-headline">
              Let's work
              <br />
              together.
            </h2>
          </div>
          <a
            href="mailto:shrivastav.atharv21@gmail.com"
            className="group relative inline-block px-12 py-4 bg-neutral-800 text-white font-normal rounded-full hover:bg-black transition-colors duration-300 footer-cta"
          >
            Get in touch
            <i className="ri-arrow-right-up-line ml-2 transform group-hover:rotate-45 transition-transform"></i>
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between gap-8 py-12">
          {/* Add a class to each contact item for staggering */}
          <div className="flex flex-col gap-2 footer-contact-item">
            <span className="text-neutral-600 font-Poppins">Contact Me</span>
            <a
              href="mailto:shrivastav.atharv21@gmail.com"
              className="font-Poppins text-xl md:text-2xl text-neutral-800 hover:text-black transition-colors"
            >
              shrivastav.atharv21@gmail.com
            </a>
          </div>
          <div className="flex flex-col gap-2 footer-contact-item">
            <span className="text-neutral-600 font-Poppins">Follow Me</span>
            <div className="flex gap-4 text-2xl text-neutral-800">
              <a href="www.linkedin.com/in/attharv-shrivastav" className="hover:text-black transition-colors"><i className="ri-linkedin-box-fill"></i></a>
              <a href="www.github.com/attharvshrivastav" className="hover:text-black transition-colors"><i className="ri-github-fill"></i></a>
              {/* <a href="#" className="hover:text-black transition-colors"><i className="ri-instagram-line"></i></a> */}
              {/* <a href="#" className="hover:text-black transition-colors"><i className="ri-twitter-x-fill"></i></a> */}
            </div>
          </div>
        </div>

        {/* Add a class for the bottom bar animation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t-2 border-neutral-700 pt-8 text-neutral-600 font-Poppins footer-bottom">
          <p>&copy; {currentYear} — Designed & Coded by Attharv Shrivastav</p>
          <p className="flex items-center gap-2">
            Indore, India
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {time}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
