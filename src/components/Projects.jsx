import React from "react";
import DecryptedText from "./Animation/DecryptedText";

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import project1Img from "../assets/images/1.png";
import project2Img from "../assets/images/2.png";
import project3Img from "../assets/images/3.png";

function Projects() {
  return (
    <div
      id="projects"
      className="min-h-screen w-full z-0 py-[20vh]"
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
        <HoverLink
          heading="Html to Markdown converter"
          subheading="Built with React"
          imgSrc={project1Img}
          href="https://markdown-html-converter-ten.vercel.app"
        />
        <HoverLink
          heading="Martian Mike"
          subheading="2D Platformer Game Made with Godot 2D"
          imgSrc={project2Img}
          href="https://drive.google.com/file/d/1i67iGJ4N8Rymdz18iy1WwWiL8KN0vEkk/view?usp=sharing"
        />
        <HoverLink
          heading="Furni- E-commerce website"
          subheading="E-commerce website with 3D models of objects made with ReactJS, ThreeJS, MySQL and NodeJS"
          imgSrc={project3Img}
          href="#"
        />
        {/* <HoverLink
          heading="Quiz App"
          subheading="Quiz App made in Flask"
          // imgSrc={project4Img}
          href="https://github.com/AttharvShrivastav/Quizite"
        /> */}
      </div>
    </div>
  );
}

const HoverLink = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [0.5, -0.5], ["40%", "60%"]);
  const left = useTransform(mouseXSpring, [0.5, -0.5], ["60%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
  href={href}
  ref={ref}
  onMouseMove={handleMouseMove}
  initial="initial"
  whileHover="whileHover"
  className="group relative my-2 flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 hover:border-black md:py-8 bg-[#DCDCDC] rounded-xl px-6 shadow-md"
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
    </motion.a>
  );
};

export default Projects;
