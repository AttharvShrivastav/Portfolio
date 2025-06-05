import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
     {
          name: "LinkedIn",
          url: "https://linkedin.com/in/attharv-shrivastav",
          tooltip: "Let's get professional",
          iconClass: "ri-linkedin-line",
     },
     {
          name: "GitHub",
          url: "https://github.com/attharvshrivastav",
          tooltip: "Peek under the hood",
          iconClass: "ri-github-line",
     },
     {
          name: "Email",
          url: "mailto:shrivastav.atharv21@gmail.com",
          tooltip: "Drop me a line",
          iconClass: "ri-mail-line",
     },
     // {
     //      name: "Phone",
     //      url: "tel:+1234567890",
     //      tooltip: "Ring ring!",
     //      iconClass: "ri-phone-line",
     // },
];

export default function Footer() {
     const [clickCount, setClickCount] = useState(0);
     const [showToast, setShowToast] = useState(false);
     const [darkMode, setDarkMode] = useState(false);

     const socialRefs = useRef([]);
     const footerNameRef = useRef(null);

     // Scroll-based split text animation
     useEffect(() => {
          const split = new SplitType(footerNameRef.current, {
               types: "words",
          });

          gsap.from(split.words, {
               scrollTrigger: {
                    trigger: footerNameRef.current,
                    start: "top bottom",
               },
               opacity: 0,
               y: 20,
               stagger: 0.08,
               duration: 0.6,
               ease: "power2.out",
          });

          return () => split.revert();
     }, []);

     // Social icon hover glow
     useEffect(() => {
          socialRefs.current.forEach((el) => {
               if (!el) return;
               const onEnter = () =>
                    gsap.to(el, {
                         color: "#FF5F00",
                         duration: 0.3,
                    });
               const onLeave = () =>
                    gsap.to(el, {
                         color: "",
                         duration: 0.3,
                    });

               el.addEventListener("mouseenter", onEnter);
               el.addEventListener("mouseleave", onLeave);
          });
     }, []);

     // Easter egg
     const handleCopyrightClick = () => {
          setClickCount((prev) => {
               const next = prev + 1;
               if (next === 3) {
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 3000);
                    return 0;
               }
               return next;
          });
     };


     return (
          <footer
               id="contact"
               className={`bg-page-bg relative font-sans transition-colors duration-300`}
          >
               {/* SVG Filter for sketch underline */}
               <svg
                    width="0"
                    height="0"
               >
                    <filter id="wavy">
                         <feTurbulence
                              baseFrequency="0.05"
                              numOctaves="3"
                              result="noise"
                         />
                         <feDisplacementMap
                              in="SourceGraphic"
                              in2="noise"
                              scale="3"
                         />
                    </filter>
               </svg>

               <div className="max-w-6xl mx-auto px-6 py-12 space-y-6">
                    {/* SplitText heading */}
                    <h2
                         ref={footerNameRef}
                         className="text-center text-6xl md:text-6xl font text-black font-SpaceGrotesk"
                    >
                         Attharv Shrivastav
                    </h2>

                    {/* Navigation Links */}
                    <nav className="flex justify-center gap-10 font-medium text-base">
                         {["About", "Projects", "Get in Touch"].map((label) => (
                              <a
                                   key={label}
                                   href={`#${label
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                   className="relative group"
                              >
                                   <span
                                        className="after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-accent-orange
                           after:transition-all after:duration-300 group-hover:after:scale-x-100 after:scale-x-0 after:origin-left
                           relative text-black text-2xl"
                                        style={{ filter: "url(#wavy)" }}
                                   >
                                        {label}
                                   </span>
                              </a>
                         ))}
                    </nav>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 text-2xl">
                         {socialLinks.map(
                              ({ name, url, tooltip, iconClass }, i) => (
                                   <a
                                        key={name}
                                        href={url}
                                        title={tooltip}
                                        className="transition-colors duration-300"
                                        ref={(el) =>
                                             (socialRefs.current[i] = el)
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                   >
                                        <i
                                             className={`${iconClass} text-2xl`}
                                        />
                                   </a>
                              )
                         )}
                    </div>

                    {/* Signature line */}
                    <p className="text-center text-sm italic font-[Poppins] text-gray-800 ">
                         Crafted with coffee, code, and a sprinkle of curiosity.
                    </p>

                    {/* Bottom section */}
                    <div className="flex justify-between items-center text-xs mt-8 text-gray-800 font-mono">
                         

                         <span
                              id="copyright"
                              onClick={handleCopyrightClick}
                              className="cursor-pointer"
                         >
                              © 2025 Attharv Shrivastav. All code and coffee
                              reserved.
                         </span>
                    </div>
               </div>

               {/* Easter egg toast */}
               {showToast && (
                    <div className="fixed bottom-6 right-6 bg-accent-orange text-white px-4 py-2 rounded shadow-lg animate-fadeInOut">
                         You found the secret footer! Here's a virtual high-five
                         ✋
                    </div>
               )}

               {/* Animation keyframes */}
               <style>{`
        @keyframes fadeInOut {
          0% {opacity: 0; transform: translateY(10px);}
          10% {opacity: 1; transform: translateY(0);}
          90% {opacity: 1; transform: translateY(0);}
          100% {opacity: 0; transform: translateY(10px);}
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease forwards;
        }
      `}</style>
          </footer>
     );
}
