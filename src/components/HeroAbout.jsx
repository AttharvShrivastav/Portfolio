import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterComponent from "typewriter-effect";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";

// Import your existing images
import image1 from "../assets/images/ImagePortfolio.png";
import image2 from "../assets/images/Capslock_static.png";
// Import the newly separated AboutToggle component
import AboutToggle from "./AboutToggle"; // <--- NEW IMPORT

gsap.registerPlugin(ScrollTrigger);

// =====================================
// Main HeroAbout Component
// =====================================

function HeroAbout() {
  // =====================================
  // State Declarations
  // =====================================
  const [isH1Hovered, setIsH1Hovered] = useState(false); // For h1 hover images
  const [disableH1Hover, setDisableH1Hover] = useState(false); // To disable h1 hover during scroll
  const [isGetInTouchHovered, setIsGetInTouchHovered] = useState(false); // For "Get in Touch" button hover
  const [showContactOverlay, setShowContactOverlay] = useState(false); // For contact overlay visibility

  // =====================================
  // Ref Declarations
  // =====================================
  // Hero Section Refs
  const heroSectionRef = useRef(null); // Main scroll container for Hero section
  const h1TextRef = useRef(null); // The "Attharv Shrivastav" h1
  const h1TargetPositionRef = useRef(null); // The div in About section where h1 animates to
  const h1HoverImg1Ref = useRef(null); // Image 1 for hover effect
  const h1HoverImg2Ref = useRef(null); // Image 2 for hover effect
  const bottomBarRef = useRef(null); // "Scroll down" bottom bar
  const getInTouchBtnRef = useRef(null); // "Let's Get in Touch" button div
  const getInTouchBtnH3Ref = useRef(null); // h3 inside "Let's Get in Touch" button

  // About Section Refs
  const aboutSectionRef = useRef(null); // Main container for About section
  const hiTextRef = useRef(null); // "Hi, I'm" h2
  const typewriterTextRef = useRef(null); // Typewriter h2 container
  const aboutToggleContainerRef = useRef(null); // Wrapper for the AboutToggle component

  // Contact Overlay Refs
  const contactOverlayRef = useRef(null);
  const contactTitleRef = useRef(null); // "Let's Connect" title in overlay
  const contactParagraphRef = useRef(null); // Paragraph in overlay
  const socialLinksContainerRef = useRef(null); // Social links in overlay
  const formFieldsRefs = useRef([]); // Form inputs for contact overlay
  formFieldsRefs.current = []; // Reset on every render
  const addFormFieldRef = (el) => {
    if (el && !formFieldsRefs.current.includes(el)) {
      formFieldsRefs.current.push(el);
    }
  };
  const focusAnimInputsRefs = useRef([]); // Input focus animation refs
  focusAnimInputsRefs.current = [];
  const addFocusAnimInputRef = (el) => {
    if (el && !focusAnimInputsRefs.current.includes(el)) {
      focusAnimInputsRefs.current.push(el);
    }
  };

  // =====================================
  // Event Handlers
  // =====================================

  // Contact form dummy submit handler
  const handleContactFormSubmit = useCallback((e) => {
    e.preventDefault();
    alert("Signal sent!");
    handleCloseContactOverlay();
  }, []);

  // Contact overlay close handler
  const handleCloseContactOverlay = useCallback(() => {
    const overlay = contactOverlayRef.current;
    if (!overlay) return setShowContactOverlay(false);

    gsap.to(overlay, {
      opacity: 0,
      scale: 0.95,
      clipPath: "inset(0% 0% 100% 0%)",
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => setShowContactOverlay(false),
    });
  }, []);

  // Input focus/blur animation handlers for contact form
  const animateInputUnderlineColor = useCallback((el, focused) => {
    if (!el) return;
    gsap.to(el, {
      borderColor: focused ? "#FF5F00" : "#FFFFFF",
      duration: 0.4,
      ease: "power2.out",
    });
  }, []);

  const handleInputFocus = useCallback((index) => {
    const el = focusAnimInputsRefs.current[index];
    if (!el) return;

    animateInputUnderlineColor(el, true);
    gsap.to(el, {
      scale: 1.05,
      fontSize: "1.125rem",
      letterSpacing: "0.05em",
      color: "#FF5F00",
      duration: 0.35,
      ease: "power2.out",
    });
  }, [animateInputUnderlineColor]);

  const handleInputBlur = useCallback((index) => {
    const el = focusAnimInputsRefs.current[index];
    if (!el) return;

    animateInputUnderlineColor(el, false);
    gsap.to(el, {
      scale: 1,
      fontSize: "1rem",
      letterSpacing: "normal",
      color: "#ffffff",
      duration: 0.35,
      ease: "power2.inOut",
    });
  }, [animateInputUnderlineColor]);

  // =====================================
  // GSAP Animations (useGSAP & useEffect)
  // =====================================

  // H1 hover images animation
  useEffect(() => {
    if (!h1HoverImg1Ref.current || !h1HoverImg2Ref.current) return;

    gsap.set([h1HoverImg1Ref.current, h1HoverImg2Ref.current], { opacity: 0, scale: 0 });

    if (isH1Hovered && !disableH1Hover) {
      gsap.to(h1HoverImg1Ref.current, {
        rotate: -20, x: -100, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
      });
      gsap.to(h1HoverImg2Ref.current, {
        rotate: 10, x: 100, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out",
      });
      window.dispatchEvent(new Event("cursor-hover-on"));
    } else {
      gsap.to(h1HoverImg1Ref.current, {
        opacity: 0, rotate: 0, scale: 0.8, x: 100, duration: 0.5, ease: "power3.in", overwrite: "auto",
      });
      gsap.to(h1HoverImg2Ref.current, {
        opacity: 0, rotate: 0, scale: 0.8, x: 0, duration: 0.5, ease: "power3.in", overwrite: "auto",
      });
      window.dispatchEvent(new Event("cursor-hover-off"));
    }
  }, [isH1Hovered, disableH1Hover]);

  // "Let's Get in Touch" button hover animation
  useEffect(() => {
    if (!getInTouchBtnRef.current) return;

    if (isGetInTouchHovered) {
      gsap.to(getInTouchBtnRef.current, { scale: 1.1, backgroundColor: "#FF5F00", duration: 0.3, ease: "power2.out", });
      gsap.to(getInTouchBtnH3Ref.current, { backgroundColor: "#FF5F00", duration: 0.3, ease: "power2.out", });
      window.dispatchEvent(new Event("cursor-touchHover-on"));
    } else {
      gsap.to(getInTouchBtnRef.current, { scale: 1, backgroundColor: "#C8C8C8", duration: 0.3, ease: "power2.inOut", });
      gsap.to(getInTouchBtnH3Ref.current, { backgroundColor: "#C8C8C8", duration: 0.3, ease: "power2.inOut", });
      window.dispatchEvent(new Event("cursor-touchHover-off"));
    }
  }, [isGetInTouchHovered]);

  // Bottom bar scroll animation
  useGSAP(() => {
    if (!bottomBarRef.current || !heroSectionRef.current) return;
    gsap.to(bottomBarRef.current, {
      opacity: 0, y: 300,
      scrollTrigger: {
        trigger: heroSectionRef.current,
        start: "top top",
        end: "center center",
        scrub: true,
      },
    });
  }, { scope: heroSectionRef });

  // Main H1 movement animation
  useGSAP(() => {
    if (!h1TextRef.current || !h1TargetPositionRef.current || !heroSectionRef.current) return;

    const updateH1Animation = () => {
      const h1El = h1TextRef.current;
      const targetEl = h1TargetPositionRef.current;

      if (!h1El || !targetEl) return;

      const targetBounds = targetEl.getBoundingClientRect();
      const h1Bounds = h1El.getBoundingClientRect();

      const x = targetBounds.left - h1Bounds.left;
      const y = targetBounds.top - h1Bounds.top;

      gsap.to(h1El, {
        x, y, scale: 0.52, fontWeight: 500, transformOrigin: "top left",
        scrollTrigger: {
          id: "h1-move",
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    };

    const handleResizeRefresh = () => {
      updateH1Animation();
      ScrollTrigger.refresh();
    };

    setTimeout(handleResizeRefresh, 500); // Initial call after slight delay for DOM readiness
    window.addEventListener("resize", handleResizeRefresh);

    return () => {
      window.removeEventListener("resize", handleResizeRefresh);
      ScrollTrigger.getById("h1-move")?.kill();
    };
  }, { scope: heroSectionRef });

  // Disable H1 hover during scroll
  useGSAP(() => {
    if (!heroSectionRef.current) return;
    const trigger = ScrollTrigger.create({
      trigger: heroSectionRef.current,
      start: "top top",
      end: "bottom center",
      scrub: true,
      onUpdate: (self) => {
        setDisableH1Hover(self.progress > 0.2);
        if (self.progress > 0.2) {
          setIsH1Hovered(false); // Force hover off if scrolling
        }
      },
    });
    return () => trigger.kill();
  }, { scope: heroSectionRef });

  // Contact overlay entrance animation
  useGSAP(() => {
    const overlay = contactOverlayRef.current;
    if (showContactOverlay && overlay) {
      gsap.fromTo(overlay,
        { opacity: 0, scale: 0.95, clipPath: "inset(0% 0% 100% 0%)" },
        { opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "power2.out" }
      );
    }
  }, { dependencies: [showContactOverlay], scope: contactOverlayRef });

  // Contact form fields animation (when overlay opens)
  useGSAP(() => {
    if (!showContactOverlay) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(contactTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(contactParagraphRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
      .fromTo(formFieldsRefs.current, { opacity: 0, y: 30, scale: 0.8, transformOrigin: "center center" },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power3.out", stagger: 0.12 }, "-=0.4")
      .fromTo(socialLinksContainerRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.5");

    return () => tl.kill();
  }, { dependencies: [showContactOverlay], scope: contactOverlayRef });


  // About section headers entrance animation ("Hi, I'm" / Typewriter)
  useGSAP(() => {
    gsap.set([hiTextRef.current, typewriterTextRef.current], { opacity: 0, x: -50 }); // Set initial hidden state

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    tl.to([hiTextRef.current, typewriterTextRef.current], { opacity: 1, x: 0, duration: 1, ease: "power3.out", stagger: 0.2 });
  }, { scope: aboutSectionRef });

  // AboutToggle container entrance animation
  useGSAP(() => {
    gsap.set(aboutToggleContainerRef.current, { opacity: 0, y: 100 }); // Set initial hidden state

    gsap.to(aboutToggleContainerRef.current, {
      opacity: 1, y: 0, duration: 1, ease: "power3.out",
      scrollTrigger: {
        trigger: aboutToggleContainerRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: aboutToggleContainerRef });


  return (
    <>
      {/* =================================== */}
      {/* Hero Section Content                */}
      {/* =================================== */}
      <div ref={heroSectionRef} id="home" className="h-[120vh] bg-[#C8C8C8] relative">
        <div className="flex flex-col justify-center items-center h-[90vh] w-full relative px-4 md:px-12">
          <h1
            ref={h1TextRef}
            className="text-5xl sm:text-2xl md:text-3xl lg:text-9xl z-1 font-semibold font-['Poppins'] text-[#1c1c1c] tracking-tighter text-center cursor-none"
            onMouseEnter={() => setIsH1Hovered(true)}
            onMouseLeave={() => setIsH1Hovered(false)}
          >
            Attharv Shrivastav
          </h1>

          {/* Hover Images */}
          <div
            ref={h1HoverImg1Ref}
            className="absolute top-1/2 right-0 translate-y-1/2 h-[100px] sm:h-[150px] w-[80px] sm:w-[100px] overflow-hidden"
          >
            <img
              src={image2}
              alt="Img1"
              className="h-full w-full object-cover rounded-2xl"
            />
          </div>
          <div
            ref={h1HoverImg2Ref}
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
              ref={getInTouchBtnRef}
              onMouseEnter={() => setIsGetInTouchHovered(true)}
              onMouseLeave={() => setIsGetInTouchHovered(false)}
              onClick={() => setShowContactOverlay(true)}
              className="border-2 rounded-3xl px-4 py-2 text-base md:text-xl cursor-pointer"
            >
              <h3 ref={getInTouchBtnH3Ref}>Let's Get in Touch</h3>
            </div>
          </div>
        </div>

        {/* Contact Overlay */}
        {showContactOverlay && (
          <div
            ref={contactOverlayRef}
            className="absolute top-0 right-0 h-full w-full md:w-[60vw] lg:w-[50vw] bg-[#1a1a1a] backdrop-blur-sm text-white p-6 md:p-10 z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 ref={contactTitleRef} className="text-2xl md:text-3xl font-SpaceGrotesk">
                Let's Connect
              </h2>
              <button onClick={handleCloseContactOverlay}>
                <i className="ri-close-line text-3xl text-white" />
              </button>
            </div>

            <p ref={contactParagraphRef} className="text-base md:text-lg mb-4">
              Whether you want to collaborate, chat about tech, or just say hi — I'm all ears.
            </p>

            <form className="flex flex-col gap-4">
              <input
                ref={addFormFieldRef}
                onFocus={() => handleInputFocus(0)}
                onBlur={() => handleInputBlur(0)}
                className="w-full bg-transparent border-b border-white p-2 outline-none"
                placeholder="Name"
              />
              <input
                type="email"
                ref={addFormFieldRef}
                onFocus={() => handleInputFocus(1)}
                onBlur={() => handleInputBlur(1)}
                className="w-full bg-transparent border-b border-white p-2 outline-none"
                placeholder="Email"
              />
              <textarea
                ref={addFormFieldRef}
                onFocus={() => handleInputFocus(2)}
                onBlur={() => handleInputBlur(2)}
                className="w-full bg-transparent border-b border-white p-2 outline-none"
                placeholder="Message"
                rows="4"
              />
              <span ref={addFormFieldRef} className="text-sm text-gray-400">
                No spam, just genuine vibes.
              </span>
              <button
                onClick={handleContactFormSubmit}
                className="bg-accent-orange text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#ff5e00da] transition-colors"
              >
                Send Signal
              </button>
            </form>

            <div ref={socialLinksContainerRef} className="mt-6 flex gap-4 text-2xl">
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

      {/* =================================== */}
      {/* About Section Content               */}
      {/* =================================== */}
      <div
        id="about"
        ref={aboutSectionRef}
        className="relative flex flex-col w-full bg-[#C8C8C8] px-6 sm:px-12 md:px-20 py-24"
      >
        <div className="flexflex-col gap-3 sm:gap-1">
          <h2 ref={hiTextRef} className="text-4xl sm:text-3xl md:text-6xl font-SpaceGrotesk font-medium tracking-tighter text-black">
            Hi, I'm
          </h2>
          {/* This is the target for the H1 from the Hero section */}
          <div ref={h1TargetPositionRef} className="h-16 md:h-16" />
          <div ref={typewriterTextRef} className="mt-1">
            <h2 className="text-3xl sm:text-3xl md:text-6xl tracking-tighter font-medium text-black">
              <TypewriterComponent
                options={{
                  strings: ["A Software Developer", "A Frontend Developer", "A Technology Enthusiast"],
                  autoStart: true, loop: true, cursor: "_", delay: 60, deleteSpeed: 30,
                }}
              />
            </h2>
          </div>
        </div>

        <div ref={aboutToggleContainerRef} className="w-full flex justify-end align-bottom mt-24">
          <AboutToggle />
        </div>
      </div>
    </>
  );
}

export default HeroAbout;