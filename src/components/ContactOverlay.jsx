import React, { forwardRef, useImperativeHandle, useState } from "react";

const ContactOverlay = forwardRef(({ onClose }, ref) => {
     // Using forwardRef to expose internal methods or for gsap refs

     return (
          <div
               ref={ref}
               className="absolute top-0 right-0 h-full w-full md:w-[50vw] bg-[#1a1a1ae0] backdrop-blur-sm text-white p-10 z-50"
               style={{ display: "none" }} // GSAP will control this
          >
               <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-normal font-SpaceGrotesk text-white flex items-center">
                         <i className="ri-hand-heart-line mr-2"></i> Let's Connect
                    </h2>
                    <button onClick={onClose}>
                         <i className="ri-close-line text-3xl text-white"></i>
                    </button>
               </div>
               <p className="text-lg mb-4">
                    Whether you want to collaborate, chat about tech, or just say hi — I'm all ears.
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

                    {/* You can keep your glitch button here or pass props */}
                    <GlitchButton onClick={handleClick} />
               </form>
               <div className="mt-6 flex gap-4 text-2xl">
                    <a href="mailto:shrivastav.atharv21@gmail.com" title="Ping me here">
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
     );
});

export default ContactOverlay;
