import React, { useRef } from "react";
import gsap from "gsap";

const GlitchButton = ({ onClick, className = "" }) => {
  const glitchRefs = [useRef(null), useRef(null), useRef(null)];

  const handleMouseEnter = () => {
    glitchRefs.forEach((ref, i) => {
      gsap.to(ref.current, {
        x: gsap.utils.random(-3, 3),
        y: gsap.utils.random(-2, 2),
        opacity: 0.7,
        duration: 0.08 + i * 0.05,
        repeat: 3,
        yoyo: true,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(ref.current, { x: 0, y: 0, opacity: 0.6, duration: 0.1 });
        }
      });
    });
  };

  const handleMouseLeave = () => {
    glitchRefs.forEach((ref) => {
      gsap.to(ref.current, { x: 0, y: 0, opacity: 0.6, duration: 0.1 });
    });
  };

  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 rounded-2xl bg-[#FF702D] font-SpaceGrotesk font-normal text-white overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Text */}
      <span className="relative z-10">Send the Signal</span>
      <span
        ref={glitchRefs[0]}
        className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          color: "#39ff14",
          opacity: 0.6,
          filter: "blur(0.5px) hue-rotate(30deg)"
        }}
      >
        Send the Signal
      </span>
      <span
        ref={glitchRefs[1]}
        className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          color: "#00eaff",
          opacity: 0.6,
          filter: "blur(0.5px) hue-rotate(120deg)"
        }}
      >
        Send the Signal
      </span>
      <span
        ref={glitchRefs[2]}
        className="absolute left-1/2 top-1/2 z-0 pointer-events-none"
        style={{
          transform: "translate(-50%, -50%)",
          color: "#ff00c8",
          opacity: 0.6,
          filter: "blur(0.5px) hue-rotate(240deg)"
        }}
      >
        Send the Signal
      </span>
    </button>
  );
};

export default GlitchButton;
