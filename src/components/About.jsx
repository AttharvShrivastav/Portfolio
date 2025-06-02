import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import AboutToggle from "./AboutToggle";

gsap.registerPlugin([ScrollTrigger, SplitText]);

function About({ h1TargetRef }) {

  const [downloadHover, setDownloadHover] = useState(false)

  const hiRef = useRef(null);
  const devRef = useRef(null);
  const aboutRef = useRef(null);
  const split1Ref = useRef(null);
  const split2Ref = useRef(null);
  const split3Ref = useRef(null);
  const downloadRef = useRef(null)


  useEffect(()=>{
    const splitted = new SplitText([split1Ref.current,split2Ref.current,split3Ref.current], {
    type: 'words'})
      
    gsap.from(splitted.words, {
      opacity:0,
      duration: 2,
      stagger: 0.05,
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 40%",
        // stagger: 0.1,
        // end: "bottom center",
        toggleActions: "play none none reverse",
      }
    })
    // return () => {
    //   split.revert();
    // };

    
  }, [])

  useEffect(()=>{
    gsap.to(aboutRef.current, {
  opacity: 1,      // Start invisible
  // x: -100,         // Slide in from left
  duration: 1,     // Optional: add duration
  scrollTrigger: {
    trigger: aboutRef.current,
    start: "top center",
    end: "bottom bottom",
    // markers: true, // Optional for debugging
  },
});

  }, [])

  useEffect(() => {
    gsap.fromTo(
      [hiRef.current, devRef.current],
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        // stagger: 0.2,
        ease: "power2.in",
        scrollTrigger: {
          trigger: h1TargetRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(() => {
    gsap.to(
      h1TargetRef.current,
      {
        // fontSize: "1.875rem", 
        ease: "power2.out",
        scrollTrigger: {
          trigger: h1TargetRef.current,
          start: "top center",
          // toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  useEffect(()=>{
    if (downloadHover){
      gsap.to(downloadRef.current,{
        color: '#FF5F00',
        scale: 1.1,
      })

      window.dispatchEvent(new Event('Download-button-hover-on'))
    }
    else{
      gsap.to(downloadRef.current, {
        color: "#000",
        scale: 1,
      })
      window.dispatchEvent(new Event('Download-button-hover-off'))
    }

  }, [downloadHover])

  return (
    <div className="h-[110vh] z-0 bg-[#C8C8C8] cursor-none  relative ">
      <h2 ref={hiRef} className="text-6xl font-semibold tracking-tighter p-20 pb-2 opacity-0">
        Hi, I'm
      </h2>

      <div
        ref={h1TargetRef}
        className="h-[100px] z-99 w-[300px] absolute  top-38 left-18 "
      >
        {/* This is where the h1 will land */}
      </div>

      <h2 ref={devRef} className="text-6xl p-20 mt-2 tracking-tighter font-semibold opacity-0">
        -- A Software Developer
      </h2>

      <div ref = {aboutRef} className="absolute  flex opacity-0 flex-col bottom-25 right-40 w-[40vw] min-h-[60vh] p-10">
        {/* <div className="w-full h-full p-4 ">
          <h3 className="text-3xl font-SpaceGrotesk font-600">The Engineer:</h3>
          <p ref = {split1Ref}>Rooted in computer science, I've spent years decoding the digital world—writing logic, building systems, and obsessing over clean code. Web development, 3D modeling, and game mechanics? Been there, built that.</p>
        </div>
        <div className="w-full p-4 h-full">
          <h3 className="text-3xl font-SpaceGrotesk font-600">The Creator:</h3>
          <p ref = {split2Ref}>But creativity is my catalyst. Whether I'm sculpting low-poly worlds or shaping immersive web experiences, I bring ideas to life with detail, delight, and a dash of daring.</p>
        </div>
        <div className="w-full p-4 h-full">
          <h3 className="text-3xl font-SpaceGrotesk font-600">The Balance:</h3>
          <p ref = {split3Ref}>I live at the intersection of art and algorithms—where precision meets play. And that's where I do my best work: turning technical know-how into creative magic.</p>
        </div>
        <div className="w-full flex gap-10 p-4 h-full">
          <h3 className="text-3xl font-Poppins font-600" 
          ref={downloadRef}
          onMouseEnter={()=>{setDownloadHover(true)}}
          onMouseLeave={()=>{setDownloadHover(false)}}
          >Download Resume</h3>
          
        </div>
      </div> */}
      <AboutToggle />
    </div>
    </div>
  );
}

export default About;
