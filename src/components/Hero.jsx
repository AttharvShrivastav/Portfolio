import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
import GetInTouchButton from "./GetInTouchButton";
import GlitchButton from "./GlitchButton";

gsap.registerPlugin(ScrollTrigger);

function Hero({ h1TargetRef }) {
     const [isHovered, setIsHovered] = useState(false);
     const [isHoveredTouch, setIsHoveredTouch] = useState(false);
     const [disableHover, setDisableHover] = useState(false);
     const [showContact, setShowContact] = useState(false);

     const contactOverlayRef = useRef(null);
     const imgRef = useRef(null);
     const img2Ref = useRef(null);
     const getInTouchRef = useRef(null);
     const h1Ref = useRef(null);
     const scrollContainerRef = useRef(null);
     const bottomBarRef = useRef(null);
     const getInTouchh3Ref = useRef(null);

     useEffect(() => {
          if (!imgRef.current || !img2Ref.current) return;

          gsap.set(imgRef.current, { opacity: 0, scale: 0 });
          gsap.set(img2Ref.current, { opacity: 0, scale: 0 });

          if (isHovered) {
               gsap.to(imgRef.current, {
                    rotate: -20,
                    x: -100,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
               });
               gsap.to(img2Ref.current, {
                    rotate: 10,
                    x: 100,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
               });
               window.dispatchEvent(new Event("cursor-hover-on"));
          } else {
               gsap.to(imgRef.current, {
                    opacity: 0,
                    rotate: 0,
                    scale: 0.8,
                    x: 100,
                    duration: 0.5,
                    ease: "power3.in",
                    overwrite: "auto",
               });
               gsap.to(img2Ref.current, {
                    opacity: 0,
                    rotate: 0,
                    scale: 0.8,
                    x: 0,
                    duration: 0.5,
                    ease: "power3.in",
                    overwrite: "auto",
               });
               window.dispatchEvent(new Event("cursor-hover-off"));
          }
     }, [isHovered]);

     useEffect(() => {
          if (!getInTouchRef.current) return;

          if (isHoveredTouch) {
               gsap.to(getInTouchRef.current, {
                    scale: 1.1,
                    backgroundColor: "#FF5F00",
                    duration: 0.3,
                    ease: "power2.out",
               });
               gsap.to(getInTouchh3Ref.current,{
                backgroundColor: "#FF5F00",
                duration: 0.3,
                ease: "power2.out",
               })
               window.dispatchEvent(new Event("cursor-touchHover-on"));
          } else {
               gsap.to(getInTouchRef.current, {
                    scale: 1,
                    backgroundColor: "#C8C8C8",
                    duration: 0.3,
                    ease: "power2.inOut",
               });
               gsap.to(getInTouchh3Ref.current,{
                backgroundColor: "#C8C8C8",
                duration: 0.3,
                ease: "power2.inOut",
               })
               window.dispatchEvent(new Event("cursor-touchHover-off"));
          }
     }, [isHoveredTouch]);

     useEffect(() => {
          if (!bottomBarRef.current) return;

          gsap.to(bottomBarRef.current, {
               opacity: 0,
               y: 300,
               scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: "top top",
                    end: "center center",
                    scrub: true,
               },
          });
     }, []);

     useEffect(() => {
          if (
               !h1Ref.current ||
               !h1TargetRef?.current ||
               !scrollContainerRef.current
          )
               return;

          const updateBoundsAndAnimate = () => {
               const h1El = h1Ref.current;
               const targetEl = h1TargetRef.current;

               if (!h1El || !targetEl) {
                    console.log("Nothing Found boss");
                    return;
               }

               const targetBounds = targetEl.getBoundingClientRect();
               const h1Bounds = h1El.getBoundingClientRect();
               const scrollY = window.scrollY || window.pageYOffset;
               const scrollX = window.scrollX || window.pageXOffset;

               const x = targetBounds.left + scrollX - h1Bounds.left - scrollX;
               const y = targetBounds.top + scrollY - h1Bounds.top - scrollY;

               gsap.to(h1El, {
                    x,
                    y,
                    scale: 0.52,
                    fontWeight: 500,
                    transformOrigin: "top left",
                    scrollTrigger: {
                         id: "h1-move",
                         trigger: scrollContainerRef.current,
                         start: "top top",
                         end: "bottom center",
                         scrub: true,
                         invalidateOnRefresh: true,
                    },
               });
          };

          const handleRefresh = () => {
               updateBoundsAndAnimate();
               ScrollTrigger.refresh();
          };

          setTimeout(handleRefresh, 500);
          window.addEventListener("resize", handleRefresh);

          return () => {
               window.removeEventListener("resize", handleRefresh);
               ScrollTrigger.getById("h1-move")?.kill();
          };
     }, [h1TargetRef]);

     useEffect(() => {
          if (!scrollContainerRef.current) return;

          const trigger = ScrollTrigger.create({
               trigger: scrollContainerRef.current,
               start: "top top",
               end: "bottom center",
               scrub: true,
               onUpdate: (self) => {
                    setDisableHover(self.progress > 0.2);
                    setIsHovered(false);
               },
          });

          return () => {
               trigger.kill();
          };
     }, []);
     const handleClick = () => {
          // Your custom logic here
          alert("Signal sent!");
     };

    


     

     return (
          <>
               {/* Main Hero Section */}
               <div
                    ref={scrollContainerRef}
                    className="h-[120vh] bg-[#C8C8C8]"
               >
                    <div className="flex flex-col cursor-none relative justify-center items-center h-[90vh] w-full bg-[#C8C8C8]">
                         <h1
                              ref={h1Ref}
                              className="text-9xl z-1 tracking-tighter -translate-y-1/2 text-[#1c1c1c] font-semibold font-['Poppins'] cursor-none"
                              onMouseEnter={() =>
                                   !disableHover && setIsHovered(true)
                              }
                              onMouseLeave={() =>
                                   !disableHover && setIsHovered(false)
                              }
                         >
                              Attharv Shrivastav
                         </h1>

                         {/* Hover Images */}
                         <div
                              ref={imgRef}
                              className="absolute top-1/2 right-0 translate-y-1/2 rotate-4 -translate-x-1/3 h-[150px] w-[100px] overflow-hidden"
                         >
                              <img
                                   src="../src/assets/images/Capslock_static.png"
                                   alt="Appearing Image"
                                   className="object-cover h-full w-full rounded-2xl"
                              />
                         </div>
                         <div
                              ref={img2Ref}
                              className="absolute top-0 left-0 translate-y-1/3 rotate-4 -translate-x-1/3 h-[250px] w-[170px] overflow-hidden"
                         >
                              <img
                                   src="../src/assets/images/ImagePortfolio.png"
                                   alt="Appearing Image"
                                   className="object-cover h-full w-full rounded-2xl"
                              />
                         </div>

                         {/* Bottom Bar */}
                         <div
                              ref={bottomBarRef}
                              className="absolute items-center flex justify-between p-10 bottom-0 w-full h-[20vh]"
                         >
                              <div className="flex">
                                   <span className="text-3xl">
                                        <i className="ri-arrow-right-down-line"></i>
                                   </span>
                                   <h3 className="text-2xl">Scroll down</h3>
                              </div>
                              <div className="flex justify-center mr-10 flex-col items-center">
                                   <h2 className="text-3xl font-Poppins">
                                        A software Developer
                                   </h2>
                                   <h2 className="text-3xl font-Poppins">
                                        Based in Indore
                                   </h2>
                              </div>
                              <div
                                   className="text-2xl cursor-none border-2 rounded-3xl p-4 bg-transparent flex items-center gap-4 "
                                   ref={getInTouchRef}
                                   onMouseEnter={() => setIsHoveredTouch(true)}
                                   onMouseLeave={() => setIsHoveredTouch(false)}
                                   onClick={() => setShowContact(true)}
                                   style={{ width: "fit-content" }}
                              >
                                   {/* <GetInTouchButton hovered={isHoveredTouch} /> */}
                                   <h3 ref={getInTouchh3Ref} className="ml-4 select-none">
                                        Let's Get in Touch
                                   </h3>
                              </div>
                         </div>
                    </div>
                    {showContact && (
                         <div
                              ref={contactOverlayRef}
                              className="absolute top-0 right-0 h-full w-full md:w-[50vw] bg-[#1a1a1ae0] backdrop-blur-sm text-white p-10 z-50"
                         >
                              <div className="flex justify-between items-center mb-6">
                                   <h2 className="text-3xl font-normal font-SpaceGrotesk text-white flex items-center">
                                        <i className="ri-hand-heart-line mr-2"></i>{" "}
                                        Let's Connect
                                   </h2>
                                   <button
                                        onClick={() => setShowContact(false)}
                                   >
                                        <i className="ri-close-line text-3xl text-white"></i>
                                   </button>
                              </div>
                              <p className="text-lg mb-4">
                                   Whether you want to collaborate, chat about
                                   tech, or just say hi — I'm all ears.
                              </p>
                              <form className="flex flex-col gap-4">
                                   <input
                                        className="p-3 bg-transparent border-b border-white outline-none focus:border-[#FF5F00]"
                                        placeholder="Name"
                                   />
                                   <input
                                        type="email"
                                        className="p-3 bg-transparent border-b border-white outline-none focus:border-[#FF5F00]"
                                        placeholder="Email"
                                   />
                                   <textarea
                                        className="p-3 bg-transparent border-b border-white outline-none focus:border-[#FF5F00]"
                                        placeholder="Message"
                                        rows="4"
                                   />
                                   <span className="text-sm text-gray-400">
                                        No spam, just genuine vibes.
                                   </span>

                                   <GlitchButton onClick={handleClick} />
                              </form>
                              <div className="mt-6 flex gap-4 text-2xl">
                                   <a
                                        href="mailto:shrivastav.atharv21@gmail.com"
                                        title="Ping me here"
                                   >
                                        <i className="ri-mail-line"></i>
                                   </a>
                                   <a
                                        href="https://linkedin.com/in/attharv-shrivastav"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Slide into my LinkedIn"
                                   >
                                        <i className="ri-linkedin-box-line"></i>
                                   </a>
                              </div>
                         </div>
                    )}
               </div>
          </>
     );
}

export default Hero;
