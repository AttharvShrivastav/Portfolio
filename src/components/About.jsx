import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypewriterComponent from "typewriter-effect";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- AboutToggle Component Definition ---
const codeLines = [
    "function about() {",
    "  console.log(`Rooted in computer science, I've spent years decoding the digital world—writing logic, building systems, and obsessing over clean code. Web development, 3D modeling, and game mechanics? Been there, built that.`);",
    "  console.log(`But creativity is my catalyst. Whether I'm sculpting low-poly worlds or shaping immersive web experiences, I bring ideas to life with detail, delight, and a dash of daring.`);",
    "  console.log(`I live at the intersection of art and algorithms—where precision meets play. And that's where I do my best work: turning technical know-how into creative magic.`);",
    "}"
];

function syntaxHighlight(line) {
    return line
        .replace(/\bfunction\b/g, '<span class="text-purple-400">function</span>')
        .replace(/\bconsole\b/g, '<span class="text-green-400">console</span>')
        .replace(/\blog\b/g, '<span class="text-blue-300">log</span>')
        .replace(/\babout\b/g, '<span class="text-blue-400">about</span>')
        .replace(/`([^`]*)`/g, '<span class="text-yellow-400">`$1`</span>')
        .replace(/\{/g, '<span class="text-white">{</span>')
        .replace(/\}/g, '<span class="text-white">}</span>')
        .replace(/\(/g, '<span class="text-pink-300">(</span>')
        .replace(/\)/g, '<span class="text-pink-300">)</span>')
        .replace(/;/g, '<span class="text-gray-400">;</span>');
}

const AboutToggle = () => {
    const downloadRef = useRef();
    const [downloadHover, setDownloadHover] = useState(false);
    const [showCode, setShowCode] = useState(true);
    const [typedLines, setTypedLines] = useState(codeLines.map(() => ""));
    const [typing, setTyping] = useState(true);

    const codeRef = useRef();
    const aboutRef = useRef();
    
    const handleResumeClick = (e) => {
        e.preventDefault();
        window.open('https://drive.google.com/file/d/1HRCUXi8saEhd1V8Zb6k84bBNEOASWokr/view?usp=share_link', '_blank');
    };
    
    useGSAP(() => {
        if (!showCode) return;
        setTyping(true);
        const tl = gsap.timeline({
            onComplete: () => {
                setTyping(false);
                setTimeout(() => handleTransition("toText"), 1500);
            }
        });
        setTypedLines(codeLines.map(() => ""));
        codeLines.forEach((line, lineIndex) => {
            const target = { value: 0 };
            tl.to(target, {
                value: line.length,
                duration: line.length * 0.02,
                ease: "none",
                onUpdate: () => {
                    setTypedLines(prev => {
                        const updated = [...prev];
                        updated[lineIndex] = line.substring(0, Math.floor(target.value));
                        return updated;
                    });
                }
            });
        });
    }, { dependencies: [showCode] });

    const handleTransition = (target) => {
        if (target === "toText" && showCode) {
            gsap.to(codeRef.current, {
                opacity: 0, y: 20, pointerEvents: "none", duration: 0.4,
                onComplete: () => {
                    setShowCode(false);
                    gsap.fromTo(aboutRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5 });
                }
            });
        } else if (target === "toCode" && !showCode) {
            gsap.to(aboutRef.current, {
                opacity: 0, y: 20, pointerEvents: "none", duration: 0.4,
                onComplete: () => {
                    setShowCode(true);
                    gsap.fromTo(codeRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5 });
                }
            });
        }
    };
    
    const toggleView = () => handleTransition(showCode ? "toText" : "toCode");

    useGSAP(() => {
        gsap.to(downloadRef.current, {
            color: downloadHover ? "#FF5F00" : "#000",
            scale: downloadHover ? 1.1 : 1,
            duration: 0.3
        });
    }, { dependencies: [downloadHover] });

    return (
        <div className="relative w-full max-w-2xl mx-auto p-8 rounded-xl bg-[#c8c8c8] select-none h-[800px] flex flex-col">
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 font-medium">{showCode ? "Code View" : "Text View"}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={!showCode} onChange={toggleView} />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#FF5F00]"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                    </label>
                </div>
            </div>
            
            <div className="relative flex-grow overflow-hidden">
                <div ref={codeRef} style={{ display: showCode ? "" : "none", opacity: 1 }} className="absolute inset-0 rounded-lg bg-[#18181B] border border-gray-700 h-full">
                    <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-700">
                        <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                        <span className="w-3 h-3 rounded-full bg-green-400"></span>
                        <span className="ml-6 text-gray-200 text-sm font-mono select-none">about.js</span>
                    </div>
                    <div className="flex h-full w-full overflow-hidden">
                        <div className="bg-gray-900 text-sm pt-4 px-4 font-mono text-gray-500 select-none">
                            {Array.from({ length: 15 }, (_, i) => <div key={i} className="leading-relaxed">{i + 1}</div>)}
                        </div>
                        <div className="overflow-auto py-4 pr-6 pl-2 w-full">
                            {typedLines.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap break-words text-sm text-white font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) + (typing && i === typedLines.findIndex((l, j) => l !== codeLines[j]) ? `<span class="inline-block bg-pink-500 w-1 h-5 align-middle"></span>` : "") }} />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Corrected Text View Layout - No scrollbar, adjusted sizes */}
                <div ref={aboutRef} style={{ display: showCode ? "none" : "", opacity: 0 }} className="absolute inset-0 flex flex-col h-full">
                    {/* Main content area without scrollbar */}
                    <div className="flex-grow p-4 space-y-3">
                        <div>
                            {/* Reduced font size for heading */}
                            <h3 className="text-xl font-SpaceGrotesk font-semibold text-neutral-800">The Engineer:</h3>
                            {/* Reduced font size and line height for paragraph */}
                            <p className="font-Poppins text-neutral-700 text-sm leading-relaxed mt-1"> I speak fluent code—C++, Java, Python, JavaScript, and a few more dialects for good measure. Whether I’m building authentication systems that shave seconds off your login or deploying 3D models that pop right off the screen, I’m all about making tech smoother, faster, and a little more magical. From face recognition at HAL to e-commerce at Furni, I’ve got a knack for turning complex problems into clean, elegant solutions. </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-SpaceGrotesk font-semibold text-neutral-800">The Creator:</h3>
                            <p className="font-Poppins text-neutral-700 text-sm leading-relaxed mt-1"> Creativity isn’t just a buzzword—it’s my favorite tool. I sculpt low-poly worlds in Blender, craft interactive web experiences with React and Three.js, and design games that turn pixels into play. For me, every project is a playground, and I’m here to build, break, and reimagine the rules. </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-SpaceGrotesk font-semibold text-neutral-800">The Balance:</h3>
                            <p className="font-Poppins text-neutral-700 text-sm leading-relaxed mt-1"> I live at the crossroads of logic and imagination, where algorithms meet artistry. Whether I’m debugging code or designing a 3D landscape, I believe the best work happens when precision and playfulness collide. Let’s turn tech into something a little more human—one project at a time. </p>
                        </div>
                    </div>
                    {/* Bottom action bar */}
                    <div className="w-full mt-1 p-4 flex-shrink-0">
                        <div className="border-t border-gray-400 pt-4 flex justify-between items-center">
                            <h3 className="text-base sm:text-lg font-Poppins text-neutral-800">Let's talk work?</h3>
                            <button ref={downloadRef} onClick={handleResumeClick} onMouseEnter={() => setDownloadHover(true)} onMouseLeave={() => setDownloadHover(false)} className="text-base sm:text-lg font-Poppins cursor-pointer transition-transform duration-300 font-semibold">
                                Equip My Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main About Component ---
function About({ h1TargetRef }) {
  const aboutSectionRef = useRef(null);
  const hiRef = useRef(null);
  const devRef = useRef(null);
  const aboutToggleRef = useRef(null);

  useGSAP(() => {
    if (!hiRef.current || !devRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from([hiRef.current, devRef.current], {
      opacity: 0, x: -50, duration: 1, ease: "power3.out", stagger: 0.2,
    });
  }, { scope: aboutSectionRef });

  useGSAP(() => {
    if (!aboutToggleRef.current) return;
    gsap.from(aboutToggleRef.current, {
      opacity: 0, y: 100, duration: 1, ease: "power3.out",
      scrollTrigger: {
        trigger: aboutToggleRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      }
    });
  }, { scope: aboutSectionRef });

  return (
    <div
      id="about"
      ref={aboutSectionRef}
      className="relative w-full bg-[#C8C8C8] px-6 sm:px-12 md:px-20 py-24"
    >
      <div className="flex flex-col gap-3 sm:gap-1">
        <h2 ref={hiRef} className="text-4xl sm:text-3xl md:text-6xl font-SpaceGrotesk font-medium tracking-tighter text-black">
          Hi, I'm
        </h2>
        <div ref={h1TargetRef} className="h-16 md:h-16" />
        <div ref={devRef} className="mt-1">
          <h2 className="text-3xl sm:text-3xl md:text-6xl tracking-tighter font-medium text-black">
            <TypewriterComponent
              options={{
                strings: ["A Software Developer", "A Frontend Developer", "A Technology Enthusiast"],
                autoStart: true, loop: true, cursor: "_", delay: 60, deleteSpeed: 30,
              }}
            />
          </h2>
        </div>
      </div>
      
      <div ref={aboutToggleRef} className="w-full flex justify-end mt-24">
        <div className="w-full lg:w-3/4">
          <AboutToggle />
        </div>
      </div>
    </div>
  );
}

export default About;
