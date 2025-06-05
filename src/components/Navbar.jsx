import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

function Navbar() {
  const navItems = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll to the section smoothly and close dropdown on mobile
  const handleClick = (id) => {
    setActiveSection(id);
    setIsOpen(false);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optional: listen to scroll events to update activeSection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Split text for letter animation

  return (
    <div className="bg-[#C8C8C8]">
      {/* Desktop Nav */}
      <div className="font-SpaceGrotesk text-2xl nav-holder hidden md:flex items-center justify-center gap-20 w-full h-[10vh]">
        {navItems.map(({ label, id }) => (
          <motion.h1
            key={id}
            onClick={() => handleClick(id)}
            className={`p-2 rounded cursor-none ${
              activeSection === id
                ? "bg-[#171717] text-[#f6f6f6]"
                : "text-[#1c1c1c]"
            }`}
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#171717",
              color: "#f6f6f6",
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            animate={{ scale: 1 }}
          >
            {label}
          </motion.h1>
        ))}
      </div>

      {/* Mobile Nav */}


      {/* Mobile Dropdown */}
      {/* <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 py-6 md:hidden bg-[rgba(0,0,0,0.5)]"
          >
            {navItems.map(({ label, id }, index) => (
              <motion.h1
                key={id}
                onClick={() => handleClick(id)}
                className={`text-lg p-2 rounded cursor-none ${
                  activeSection === id
                    ? "bg-[#171717] text-[#f6f6f6]"
                    : "text-white"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 * index + 0.2, duration: 0.3 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#171717",
                  color: "#f6f6f6",
                  transition: { duration: 0.4, ease: "easeIn" },
                }}
              >
                {splitText(label)}
              </motion.h1>
            ))}
          </motion.div>
        )}
      </AnimatePresence> */}
    </div>
  );
}

export default Navbar;
