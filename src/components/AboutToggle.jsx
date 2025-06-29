import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(ScrollTrigger);


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

// =====================================
// AboutToggle Component
// =====================================
const AboutToggle = () => {
    // State
    const [isResumeBtnHovered, setIsResumeBtnHovered] = useState(false); // For "Equip My Resume" button
    const [isCodeView, setIsCodeView] = useState(true); // Toggles between code and text view
    const [typedCodeLines, setTypedCodeLines] = useState(codeLines.map(() => "")); // For typing effect
    const [isTyping, setIsTyping] = useState(true); // Controls typing animation state

    // Refs
    const resumeDownloadBtnRef = useRef(null); // "Equip My Resume" button
    const codeViewContentRef = useRef(null); // Div for the code view
    const textViewContentRef = useRef(null); // Div for the text view
    
    // Event Handlers
    const handleResumeClick = (e) => {
        e.preventDefault();
        window.open('https://drive.google.com/file/d/1HRCUXi8saEhd1V8Zb6k84bBNEOASWokr/view?usp=share_link', '_blank');
    };
    
    const handleAboutViewTransition = (targetView) => {
        if (targetView === "toText" && isCodeView) {
            gsap.to(codeViewContentRef.current, {
                opacity: 0, y: 20, pointerEvents: "none", duration: 0.4,
                onComplete: () => {
                    setIsCodeView(false);
                    gsap.fromTo(textViewContentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5 });
                }
            });
        } else if (targetView === "toCode" && !isCodeView) {
            gsap.to(textViewContentRef.current, {
                opacity: 0, y: 20, pointerEvents: "none", duration: 0.4,
                onComplete: () => {
                    setIsCodeView(true);
                    gsap.fromTo(codeViewContentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.5 });
                }
            });
        }
    };
    
    const toggleAboutView = () => handleAboutViewTransition(isCodeView ? "toText" : "toCode");

    // GSAP Animations
    
    // "Equip My Resume" button hover animation
    useGSAP(() => {
        if (!resumeDownloadBtnRef.current) return;
        gsap.to(resumeDownloadBtnRef.current, {
            color: isResumeBtnHovered ? "#FF5F00" : "#000",
            scale: isResumeBtnHovered ? 1.1 : 1,
            duration: 0.3
        });
        // --- ADDED CURSOR EVENT DISPATCH HERE ---
        if (isResumeBtnHovered) {
            window.dispatchEvent(new Event("Download-button-hover-on"));
        } else {
            window.dispatchEvent(new Event("Download-button-hover-off"));
        }
    }, { dependencies: [isResumeBtnHovered] });

    // Typing animation for code view
    useEffect(() => {
        if (!isCodeView) {
            setIsTyping(false);
            setTypedCodeLines(codeLines.map(line => line)); // Ensure full lines are present if not typing
            return;
        }
        
        setIsTyping(true);
        setTypedCodeLines(codeLines.map(() => "")); // Reset for fresh animation

        const tl = gsap.timeline({
            onComplete: () => {
                setIsTyping(false);
                // The original code had an auto-transition to text view here.
                // If you want that, uncomment this line:
                // setTimeout(() => handleAboutViewTransition("toText"), 1500); 
            }
        });

        codeLines.forEach((line, lineIndex) => {
            const target = { value: 0 };
            tl.to(target, {
                value: line.length,
                duration: line.length * 0.02,
                ease: "none",
                onUpdate: () => {
                    setTypedCodeLines(prev => {
                        const updated = [...prev];
                        updated[lineIndex] = line.substring(0, Math.floor(target.value));
                        return updated;
                    });
                }
            });
        });

        return () => tl.kill(); // Cleanup timeline
    }, [isCodeView]);


    return (
        <div className="relative w-full max-w-3xl p-6 rounded-2xl flex flex-col bg-[#c8c8c8]">
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 font-medium">{isCodeView ? "Code View" : "Text View"}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={!isCodeView} onChange={toggleAboutView} />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#FF5F00]"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                    </label>
                </div>
            </div>
            
            <div className="relative flex-grow overflow-hidden min-h-[600px]">
                <div ref={codeViewContentRef} style={{ display: isCodeView ? "" : "none", opacity: 1 }} className="absolute inset-0 rounded-lg bg-[#18181B] border border-gray-700 h-full">
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
                            {typedCodeLines.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap break-words text-sm text-white font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) + (isTyping && i === typedCodeLines.findIndex((l, j) => l !== codeLines[j]) ? `<span class="inline-block bg-pink-500 w-1 h-5 align-middle"></span>` : "") }} />
                            ))}
                        </div>
                    </div>
                </div>
                <div ref={textViewContentRef} style={{ display: isCodeView ? "none" : "", opacity: 0 }} className="absolute inset-0 flex flex-col justify-between h-full p-4">
                     <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-SpaceGrotesk mb-1 font-medium text-neutral-800">The Engineer:</h3>
                            <p className="text-base font-Poppins text-neutral-700">I speak fluent code—C++, Java, Python, JavaScript. Whether building robust auth systems or deploying 3D models, I turn complex problems into clean, elegant solutions that feel like magic.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-SpaceGrotesk mb-1 font-medium text-neutral-800">The Creator:</h3>
                            <p className="text-base font-Poppins text-neutral-700">Creativity is my favorite tool. I sculpt low-poly worlds in Blender, craft interactive web experiences with React and Three.js, and design games that turn pixels into play. Every project is a playground.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-SpaceGrotesk mb-1 font-medium text-neutral-800">The Balance:</h3>
                            <p className="text-base font-Poppins text-neutral-700">I live at the crossroads of logic and imagination. I believe the best work happens when precision and playfulness collide. Let’s turn tech into something a little more human—one project at a time.</p>
                        </div>
                    </div>
                    <div className="w-full mt-auto">
                        <div className="border-t border-gray-400 pt-4 flex justify-between items-center">
                            <h3 className="text-lg sm:text-xl font-Poppins text-neutral-800">Let's talk work?</h3>
                            <button ref={resumeDownloadBtnRef} onClick={handleResumeClick} onMouseEnter={() => setIsResumeBtnHovered(true)} onMouseLeave={() => setIsResumeBtnHovered(false)} className="text-lg sm:text-xl font-Poppins cursor-pointer transition-transform font-semibold">
                                Equip My Resume
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutToggle;