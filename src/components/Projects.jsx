import React, { useState, useRef } from "react";
import DecryptedText from "./Animation/DecryptedText";
import ProjectDetail from "./ProjectDetail";
// import significoImgg from "./assets/images/signi"

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";

// Import your project images
import project1Img from "../assets/images/1.png";
import project2Img from "../assets/images/2.png";
import project3Img from "../assets/images/3.png";
import project4Img from "../assets/images/4.png";
import project5Img from "..//assets/images/5.png"
// TODO: Add an image for your Significo recreation!
// import significoImg from "../assets/images/significo-recreation-preview.png"; // Uncomment and replace with actual path

const projectsData = [
  // Existing projects
  {
    heading: "Html to Markdown converter",
    subheading: "Built with React",
    description: "A simple and efficient web-based tool created with React that allows users to convert HTML code into Markdown syntax instantly. It provides a side-by-side live preview for easy comparison and editing.",
    imgSrc: project1Img,
    href: "https://markdown-html-converter-ten.vercel.app",
  },
  {
    heading: "Martian Mike",
    subheading: "2D Platformer Game Made with Godot",
    description: "Martian Mike is an engaging 2D platformer game developed using the Godot Engine. Players navigate Mike through challenging Martian Martian landscapes, overcoming obstacles and enemies in a retro-inspired adventure.",
    imgSrc: project2Img,
    href: "https://drive.google.com/file/d/1i67iGJ4N8Rymdz18iy1WwWiL8KN0vEkk/view?usp=sharing",
  },
  {
    heading: "Furni- E-commerce website",
    subheading: "ReactJS, ThreeJS, MySQL, NodeJS",
    description: "Furni is a full-stack e-commerce platform that revolutionizes online furniture shopping. It integrates interactive 3D models built with Three.js, allowing users to view products from every angle. The backend is powered by NodeJS and MySQL.",
    imgSrc: project3Img,
    href: "#",
  },
  {
    heading: "Significo Website Recreation",
    subheading: "Front-End Development (HTML, CSS, JS, TailwindCSS)",
    description: "A meticulously crafted front-end recreation of the Significo website, demonstrating proficiency in responsive design, complex layouts using modern CSS (Flexbox, Grid), custom animations, and interactive elements. Built to replicate pixel-perfect fidelity.",
    imgSrc: project4Img, 
    href: "https://significo-recreation.onrender.com", 
  },
  {
    heading: "Bento Box Design",
    subheading: "Responsive UI/UX (HTML, CSS, GSAP, Locomotive Scroll)",
    description: "A modern and visually striking web design featuring a dynamic Bento Box layout. This project showcases advanced UI/UX principles, seamless responsiveness, and smooth scroll animations implemented with GSAP and Locomotive Scroll, providing an engaging user experience.",
    imgSrc: project5Img, 
    href: "https://bentobuildbox.netlify.app", 
  },
];

function Projects() {
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleNavigateNext = () => {
    if (currentIndex < projectsData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNavigatePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleProjectClick = (index) => {
    setCurrentIndex(index);
  };

  const handleCloseDetail = () => {
    setCurrentIndex(null);
  };

  const isDetailViewOpen = currentIndex !== null;

  return (
    <>
      <div
        id="projects"
        className="min-h-screen w-full px-6 z-0 py-[20vh]"
        style={{ backgroundColor: "#c8c8c8" }}
      >
        <DecryptedText
          text="PROJECTS"
          speed={100}
          maxIterations={20}
          characters="ABCD1234!?"
          className="revealed"
          parentClassName="all-letters text-7xl p-5"
          encryptedClassName="encrypted"
        />

        <div className="mx-auto w-[90%] p-4 md:p-8">
          {projectsData.map((project, index) => (
            <HoverLink
              key={index}
              {...project}
              onProjectClick={() => handleProjectClick(index)}
            />
          ))}
        </div>
      </div>

      {isDetailViewOpen && (
        <ProjectDetail
          project={projectsData[currentIndex]}
          onClose={handleCloseDetail}
          onNavigateNext={handleNavigateNext}
          onNavigatePrev={handleNavigatePrev}
          currentIndex={currentIndex}
          totalProjects={projectsData.length}
        />
      )}
    </>
  );
}

const HoverLink = ({ heading, imgSrc, subheading, onProjectClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      ref={ref}
      onClick={onProjectClick}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative my-2 flex cursor-pointer items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-black md:py-8 bg-[#DCDCDC] rounded-xl px-6 shadow-md"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-4xl font-normal font-SpaceGrotesk text-neutral-700 transition-colors duration-500 group-hover:text-black md:text-6xl"
        >
          {heading.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: { x: 0 },
                whileHover: { x: 16 },
              }}
              transition={{ type: "spring" }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-base font-Poppins text-neutral-600 transition-colors duration-500 group-hover:text-black">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top,
          left,
          translateX: "-50%",
          translateY: "-70%",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg" },
          whileHover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
        alt={`Preview for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <i className="ri-arrow-right-line"></i>
      </motion.div>
    </motion.div>
  );
};
export default Projects;