import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "remixicon/fonts/remixicon.css";
import GetInTouchButton from "./GetInTouchButton";
import GlitchButton from "./GlitchButton";
import image1 from "../assets/images/ImagePortfolio.png"
import image2 from "../assets/images/Capslock_static.png"

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

  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const socialLinksRef = useRef(null);

  // For form fields
  const formFieldsRef = useRef([]);
  formFieldsRef.current = []; // reset on every render

  const addToRefs = (el) => {
    if (el && !formFieldsRef.current.includes(el)) {
      formFieldsRef.current.push(el);
    }
  };

  // Refs to all animating inputs
  const focusAnimRefs = useRef([]);
  focusAnimRefs.current = [];

  const addFocusRef = (el) => {
    if (el && !focusAnimRefs.current.includes(el)) {
      focusAnimRefs.current.push(el);
    }
  };

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
      gsap.to(getInTouchh3Ref.current, {
        backgroundColor: "#FF5F00",
        duration: 0.3,
        ease: "power2.out",
      });
      window.dispatchEvent(new Event("cursor-touchHover-on"));
    } else {
      gsap.to(getInTouchRef.current, {
        scale: 1,
        backgroundColor: "#C8C8C8",
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(getInTouchh3Ref.current, {
        backgroundColor: "#C8C8C8",
        duration: 0.3,
        ease: "power2.inOut",
      });
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
    if (!h1Ref.current || !h1TargetRef?.current || !scrollContainerRef.current)
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

// ::contentReference[oaicite:4]{index=4}
 
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    alert("Signal sent!");
  };

  useEffect(() => {
    const overlay = contactOverlayRef.current;

    if (showContact && overlay) {
      gsap.fromTo(
        overlay,
        {
          opacity: 0,
          scale: 0.95,
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, [showContact]);

  const handleCloseOverlay = () => {
    const overlay = contactOverlayRef.current;
    if (!overlay) return setShowContact(false);

    gsap.to(overlay, {
      opacity: 0,
      scale: 0.95,
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => setShowContact(false),
    });
  };

  useEffect(() => {
    if (!showContact) return;

    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        paragraphRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        formFieldsRef.current,
        {
          opacity: 0,
          y: 30,
          scale: 0.8,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.4"
      )
      .fromTo(
        socialLinksRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );

    return () => tl.kill();
  }, [showContact]);

  const handleFocus = (index) => {
    const el = focusAnimRefs.current[index];
    if (!el) return;

    animateUnderlineColor(el, true);
    gsap.to(el, {
      scale: 1.05,
      fontSize: "1.125rem",
      letterSpacing: "0.05em",
      color: "#FF5F00",
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleBlur = (index) => {
    const el = focusAnimRefs.current[index];
    if (!el) return;

    animateUnderlineColor(el, false);
    gsap.to(el, {
      scale: 1,
      fontSize: "1rem",
      letterSpacing: "normal",
      color: "#ffffff",
      duration: 0.35,
      ease: "power2.inOut",
    });
  };

  const animateUnderlineColor = (el, focused) => {
    if (!el) return;
    gsap.to(el, {
      borderColor: focused ? "#FF5F00" : "#FFFFFF",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div ref={scrollContainerRef} id="home" className="h-[120vh] bg-[#C8C8C8] relative">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center h-[90vh] w-full relative px-4 md:px-12">
        <h1
          ref={h1Ref}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl z-1 font-semibold font-['Poppins'] text-[#1c1c1c] tracking-tighter text-center cursor-none"
          onMouseEnter={() => !disableHover && setIsHovered(true)}
          onMouseLeave={() => !disableHover && setIsHovered(false)}
        >
          Attharv Shrivastav
        </h1>

        {/* Hover Images */}
        <div
          ref={imgRef}
          className="absolute top-1/2 right-0 translate-y-1/2 h-[100px] sm:h-[150px] w-[80px] sm:w-[100px] overflow-hidden"
        >
          <img
            src={image2}
            alt="Img1"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
        <div
          ref={img2Ref}
          className="absolute top-0 left-0 translate-y-1/3 h-[150px] sm:h-[250px] w-[120px] sm:w-[170px] overflow-hidden"
        >
          <img
            src={image1}
            alt="Img2"
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>

        {/* Bottom Bar */}
        <div
          ref={bottomBarRef}
          className="absolute bottom-0 w-full px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2 text-xl md:text-2xl">
            <i className="ri-arrow-right-down-line" />
            <span>Scroll down</span>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-lg md:text-2xl">A Software Developer</h2>
            <h2 className="text-lg md:text-2xl">Based in Indore</h2>
          </div>

          <div
            ref={getInTouchRef}
            onMouseEnter={() => setIsHoveredTouch(true)}
            onMouseLeave={() => setIsHoveredTouch(false)}
            onClick={() => setShowContact(true)}
            className="border-2 rounded-3xl px-4 py-2 text-base md:text-xl cursor-pointer"
          >
            <h3 ref={getInTouchh3Ref}>Let's Get in Touch</h3>
          </div>
        </div>
      </div>

      {/* Contact Overlay */}
      {showContact && (
        <div
          ref={contactOverlayRef}
          className="absolute top-0 right-0 h-full w-full md:w-[60vw] lg:w-[50vw] bg-[#1a1a1a] backdrop-blur-sm text-white p-6 md:p-10 z-50 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 ref={titleRef} className="text-2xl md:text-3xl font-SpaceGrotesk">
              Let's Connect
            </h2>
            <button onClick={handleCloseOverlay}>
              <i className="ri-close-line text-3xl text-white" />
            </button>
          </div>

          <p ref={paragraphRef} className="text-base md:text-lg mb-4">
            Whether you want to collaborate, chat about tech, or just say hi — I'm all ears.
          </p>

          <form className="flex flex-col gap-4">
            <input
              ref={addFocusRef}
              onFocus={() => handleFocus(0)}
              onBlur={() => handleBlur(0)}
              className="w-full bg-transparent border-b border-white p-2 outline-none"
              placeholder="Name"
            />
            <input
              type="email"
              ref={addFocusRef}
              onFocus={() => handleFocus(1)}
              onBlur={() => handleBlur(1)}
              className="w-full bg-transparent border-b border-white p-2 outline-none"
              placeholder="Email"
            />
            <textarea
              ref={addFocusRef}
              onFocus={() => handleFocus(2)}
              onBlur={() => handleBlur(2)}
              className="w-full bg-transparent border-b border-white p-2 outline-none"
              placeholder="Message"
              rows="4"
            />
            <span ref={addToRefs} className="text-sm text-gray-400">
              No spam, just genuine vibes.
            </span>
            <GlitchButton onClick={handleClick} />
          </form>

          <div ref={socialLinksRef} className="mt-6 flex gap-4 text-2xl">
            <a href="mailto:shrivastav.atharv21@gmail.com">
              <i className="ri-mail-line" />
            </a>
            <a
              href="https://linkedin.com/in/attharv-shrivastav"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="ri-linkedin-box-line" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hero;
