import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import { div } from "motion/react-client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Hero({ h1TargetRef }) {

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredTouch, setIsHoveredTouch] = useState(false);
  const [disableHover, setDisableHover] = useState(false);

  const imgRef = useRef(null);
  const img2Ref = useRef(null);
  const getInTouchRef = useRef(null);
  const h1Ref = useRef(null);
  const scrollContainerRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    gsap.set(imgRef.current, { opacity: 0, scale: 0 });
    gsap.set(img2Ref.current, { opacity: 0, scale: 0 });

    if (isHovered) {
      gsap.to(imgRef.current, {
        rotate: -20,
        x: -100,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.to(img2Ref.current, {
        rotate: 10,
        x: 100,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });

      window.dispatchEvent(new Event('cursor-hover-on'));
    } else {
      gsap.to(imgRef.current, {
        opacity: 0,
        rotate: 0,
        scale: 0.8,
        x: 100,
        duration: 0.5,
        ease: "power3.in",
        overwrite: 'auto',
      });
      gsap.to(img2Ref.current, {
        opacity: 0,
        rotate: 0,
        scale: 0.8,
        x: 0,
        duration: 0.5,
        ease: "power3.in",
        overwrite: 'auto',
      });

      window.dispatchEvent(new Event('cursor-hover-off'));
    }
  }, [isHovered]);

  useEffect(() => {
    if (isHoveredTouch) {
      gsap.to(getInTouchRef.current, {
        scale: 1.1,
        backgroundColor: "#FF5F00",
        duration: 0.3,
        ease: "power2.out",
      });

      window.dispatchEvent(new Event('cursor-touchHover-on'));
    } else {
      gsap.to(getInTouchRef.current, {
        scale: 1,
        duration: 0.3,
        backgroundColor: "#C8C8C8",
        ease: "power2.inOut",
      });
      window.dispatchEvent(new Event('cursor-touchHover-off'));
    }
  }, [isHoveredTouch]);

  useEffect(() => {
    gsap.to(bottomBarRef.current, {
      opacity: 0,
      y: 300,
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "center center",
        // markers: true,
        scrub: true,
      },
    });
  }, []);

  useEffect(() => {
  if (!h1Ref.current || !h1TargetRef?.current || !scrollContainerRef.current) return;

  const h1El = h1Ref.current;
  const targetEl = h1TargetRef.current;

  const updateBoundsAndAnimate = () => {
    const h1Bounds = h1El.getBoundingClientRect();
    const targetBounds = targetEl.getBoundingClientRect();

    const x = targetBounds.left - h1Bounds.left;
    const y = targetBounds.top - h1Bounds.top;

    console.log("Target Position:", { x, y });

    // Reset any previous scrollTriggers
    // ScrollTrigger.getById("h1-move")?.kill();

    gsap.to(h1El, {
      x,
      y,
      scale: 0.52,
      ease: "none",
      fontWeight: 500,
      transformOrigin: "top left",
      scrollTrigger: {
        id: "h1-move",
        trigger: scrollContainerRef.current,
        start: "top top",
        end: "bottom center",
        scrub: true,
        // markers: true, // ✅ Enable this to debug visually
        invalidateOnRefresh: true,
        onRefresh: () => {
          console.log("Refreshed scroll trigger for h1");
        },
      },
    });
  };

  // Run after layout settles
  setTimeout(() => {
    updateBoundsAndAnimate();
    ScrollTrigger.refresh();
  }, 200);

  window.addEventListener("resize", updateBoundsAndAnimate);

  return () => {
    window.removeEventListener("resize", updateBoundsAndAnimate);
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
      // Disable hover once scroll progresses past 20%
      setDisableHover(self.progress > 0.2);
      setIsHovered(false)
    },
  });

  return () => {
    trigger.kill();
  };
}, []);


  return (
    <div ref={scrollContainerRef} className="h-[120vh] bg-[#C8C8C8] ">
      <div className="flex flex-col cursor-none relative justify-center items-center h-[90vh] w-full bg-[#C8C8C8]">
        <h1
          ref={h1Ref}
          className="text-9xl z-50 tracking-tighter -translate-y-1/2 font-semibold font-['Poppins'] cursor-none"
          onMouseEnter={() => !disableHover && setIsHovered(true)}
          onMouseLeave={() => !disableHover && setIsHovered(false)}
        >
          Attharv Shrivastav
        </h1>

        <div ref={imgRef} className="absolute top-1/2 right-0 translate-y-1/2 rotate-4 -translate-x-1/3 h-[150px] w-[100px] overflow-hidden">
          <img
            src="../src/assets/images/Capslock_static.png"
            alt="Appearing Image"
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>
        <div ref={img2Ref} className="absolute top-0 left-0 translate-y-1/3 rotate-4 -translate-x-1/3 h-[250px] w-[170px] overflow-hidden">
          <img
            src="../src/assets/images/ImagePortfolio.png"
            alt="Appearing Image"
            className="object-cover h-full w-full rounded-2xl"
          />
        </div>

        <div
          ref={bottomBarRef}
          className="absolute items-center flex justify-between p-10 bottom-0 w-full h-[20vh]"
        >
          <div className="flex">
            <span className="text-3xl"><i className="ri-arrow-right-down-line"></i></span>
            <h3 className="text-2xl">Scroll down</h3>
          </div>
          <div className="flex justify-center mr-10 flex-col items-center">
            <h2 className="text-3xl font-Poppins">A software Developer</h2>
            <h2 className="text-3xl font-Poppins">Based in Indore</h2>
          </div>
          <div>
            <h3
              className="text-2xl cursor-none border-2 rounded-3xl p-4"
              ref={getInTouchRef}
              onMouseEnter={() => setIsHoveredTouch(true)}
              onMouseLeave={() => setIsHoveredTouch(false)}
            >
              Let's Get in Touch
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
