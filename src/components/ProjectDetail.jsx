import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ProjectDetail = ({
  project,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  currentIndex,
  totalProjects,
}) => {
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const textContentRef = useRef(null);

  const handleNavigation = (navigate) => {
    gsap.to(textContentRef.current, {
      opacity: 0,
      x: -30,
      duration: 0.3,
      ease: "power2.in",
      onComplete: navigate,
    });
  };

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { opacity: 0, y: 50, duration: 0.3, ease: "power2.in" });
    tl.to(backdropRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, "-=0.2");
  };

  // HOOK 1: For the main modal entrance (runs only ONCE). This is correct.
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(backdropRef.current, { opacity: 1, duration: 0.8, ease: "power2.inOut" });
    tl.from(contentRef.current, { opacity: 0, y: 50, duration: 0.6, ease: "power2.out" }, "-=0.5");
  }, []);

  // --- HOOK 2: THE CORRECTION IS HERE ---
  // For the text transition (runs EVERY time the project changes).
  useGSAP(() => {
    // 1. Immediately SET the new content to be invisible and shifted to the right.
    //    This prevents the flash of un-animated content.
    gsap.set(textContentRef.current, { opacity: 0, x: 30 });

    // 2. Animate it TO its final state (opacity: 1, x: 0).
    gsap.to(textContentRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
      delay: 0.1, // A tiny delay for a smoother feel after the state change
    });
    
  }, { dependencies: [project] }); // This hook re-runs on project change.


  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm opacity-0"
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-11/12 max-w-2xl bg-[#DCDCDC] text-black rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={() => handleNavigation(onNavigatePrev)}
            className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-neutral-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors"
            aria-label="Previous project"
          >
            <i className="ri-arrow-left-s-line text-2xl"></i>
          </button>
        )}
        {currentIndex < totalProjects - 1 && (
          <button
            onClick={() => handleNavigation(onNavigateNext)}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10 bg-neutral-800 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors"
            aria-label="Next project"
          >
            <i className="ri-arrow-right-s-line text-2xl"></i>
          </button>
        )}

        <div className="p-8 overflow-hidden">
          <div ref={textContentRef}>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-2xl text-neutral-700 hover:text-black transition-colors"
              aria-label="Close project details"
            >
              <i className="ri-close-line"></i>
            </button>
            <h2 className="text-4xl md:text-5xl font-SpaceGrotesk font-semibold text-neutral-800">
              {project.heading}
            </h2>
            <p className="mt-2 text-lg font-Poppins text-neutral-600">
              {project.subheading}
            </p>
            <div className="w-full h-px bg-neutral-400 my-4"></div>
            <p className="font-Poppins text-neutral-700">{project.description}</p>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 font-Poppins font-semibold text-white bg-neutral-800 rounded-lg hover:bg-black transition-colors"
            >
              View Project <i className="ri-arrow-right-up-line ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;