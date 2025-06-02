import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import eyes1 from '../assets/cursors/eyes1.png';
import eyes2 from '../assets/cursors/eyes2.png';

const Cursor = () => {
  const cursorRef = useRef(null);
  const imageRef = useRef(null);
  const downloadIconRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [eyeIndex, setEyeIndex] = useState(0); // Toggle between 0 and 1
  const [isTouchHover, setIsTouchHover] = useState(false);
  const [downloadHover, setDownloadHover] = useState(false);

  const eyes = [eyes1, eyes2]; 

// -----------------Cursor movement------------------

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', moveCursor);
    return () => document.removeEventListener('mousemove', moveCursor);
  }, []);

  // ---------> Hover for Cursor on H1 in Hero <---------------

  useEffect(() => {
    if (isHovered) {
      gsap.to(cursorRef.current, {
        width: 150,
        height: 140,
        backgroundColor: '#FF5F00',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(imageRef.current, {
        autoAlpha: 1,
        scale: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(cursorRef.current, {
        width: 20,
        height: 20,
        backgroundColor: '#000',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(imageRef.current, {
        autoAlpha: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered]);


  // ----------> Hover for alternate Image in Hero <-------------
  useEffect(() => {
    const handleHoverOn = () => {
      setEyeIndex((prev) => (prev === 0 ? 1 : 0)); // Alternate image
      setIsHovered(true);
    };
    const handleHoverOff = () => {
      setIsHovered(false);
    };

    window.addEventListener('cursor-hover-on', handleHoverOn);
    window.addEventListener('cursor-hover-off', handleHoverOff);

    return () => {
      window.removeEventListener('cursor-hover-on', handleHoverOn);
      window.removeEventListener('cursor-hover-off', handleHoverOff);
    };
  }, []);


  // --------Hover for GetinTouch button in Hero ---------
  useEffect(() => {
    if (isTouchHover){
      gsap.to(cursorRef.current, {
        scale: isTouchHover ? 3 : 1, // ⬅️ Change scale here
        backgroundColor: '808080',
        opacity: 0.7,
        cursor: 'disable', 
        duration: 0.3,
        ease: 'power2.out',
      });
    }
    else{
      gsap.to(cursorRef.current, {
        scale: isTouchHover ? 3 : 1, // ⬅️ Change scale here
        backgroundColor: '808080',
        opacity: 1,
        duration: 0.3,
        ease: "power2.in"
      })
    }

    window.addEventListener('cursor-touchHover-on', ()=> setIsTouchHover(true))
    window.addEventListener('cursor-touchHover-off', ()=> setIsTouchHover(false))
  }, [isTouchHover]);

  // -------------- Download Button hover --------------
  useEffect(() => {
    if (downloadHover){
      gsap.to(cursorRef.current, {
        width:  80,
        height: 80,
        backgroundColor: '#FF5F00',
        opacity:0.9,
        cursor: 'disable', 
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(downloadIconRef.current, {
        opacity: 1,
        autoAlpha: 1,
        scale: 2.5,
      });

    }
    else{
      gsap.to(cursorRef.current, {
        width: downloadHover?100:20,
        height: downloadHover?120:20, 
        backgroundColor: '#000',
        // width: '1.25rem',
        opacity: 1,
        duration: 0.3,
        ease: "power2.in"
      })
      gsap.to(downloadIconRef.current, {
        opacity: 0
      })
    }

    window.addEventListener('Download-button-hover-on', ()=> setDownloadHover(true))
    window.addEventListener('Download-button-hover-off', ()=> setDownloadHover(false))
  }, [downloadHover]);


  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-5 h-5 bg-black rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
    >
      {downloadHover ? (
        <i ref={downloadIconRef} className="ri-download-2-line scale-50 opacity-0"></i>
        ) : (
        <img
          ref={imageRef}
          src={eyes[eyeIndex]}
          alt="eyes"
          className="w-6 h-6 object-contain opacity-0 scale-50"
        />
        )}
      {/* <i></i> */}

    </div>
  );
};

export default Cursor;
