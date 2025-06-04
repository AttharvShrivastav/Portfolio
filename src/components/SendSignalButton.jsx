import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const SendSignalButton = ({ onClick, className = "" }) => {
  const rocketRef = useRef(null);
  const flame1 = useRef(null);
  const flame2 = useRef(null);
  const flame3 = useRef(null);
  const flameTimeline = useRef(null);

  // Rocket launch animation
  const handleMouseEnter = () => {
    gsap.to(rocketRef.current, {
      y: -32,
      rotate: -20,
      scale: 1.2,
      duration: 0.4,
      ease: "power2.out"
    });
    flameTimeline.current && flameTimeline.current.play();
  };

  const handleMouseLeave = () => {
    gsap.to(rocketRef.current, {
      y: 0,
      rotate: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.in"
    });
    flameTimeline.current && flameTimeline.current.pause();
  };

  // Flame flicker effect
  useEffect(() => {
    flameTimeline.current = gsap.timeline({ repeat: -1, paused: true });
    flameTimeline.current
      .to(flame1.current, {
        scaleY: 1.4,
        scaleX: 1.1,
        opacity: 0.85,
        y: 2,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      }, 0)
      .to(flame2.current, {
        scaleY: 1.2,
        scaleX: 1.3,
        opacity: 0.7,
        x: 2,
        duration: 0.13,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      }, 0.05)
      .to(flame3.current, {
        scaleY: 1.3,
        scaleX: 1.2,
        opacity: 0.6,
        x: -2,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
      }, 0.1);
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center gap-2 rounded-2xl bg-[#FF702D] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-accent-orange duration-300 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Flames */}
      <span
        ref={flame1}
        className="absolute left-3 bottom-1 h-3 w-6 rounded-full bg-yellow-400 blur-md opacity-80 z-0 pointer-events-none"
      ></span>
      <span
        ref={flame2}
        className="absolute left-4 bottom-0 h-2 w-4 rounded-full bg-orange-400 blur-sm opacity-60 z-0 pointer-events-none"
      ></span>
      <span
        ref={flame3}
        className="absolute left-5 bottom-1 h-2 w-3 rounded-full bg-red-500 blur-sm opacity-50 z-0 pointer-events-none"
      ></span>
      {/* Rocket */}
      <i
        ref={rocketRef}
        className="ri-rocket-2-fill text-xl transition-transform duration-300 z-10"
        style={{ display: "inline-block" }}
      />
      <span className="relative z-10">Send the Signal</span>
    </button>
  );
};

export default SendSignalButton;
