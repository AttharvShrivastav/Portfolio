import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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

export default function AboutToggle() {
    const downloadRef = useRef();
    const [downloadHover, setDownloadHover] = useState(false);

    const [showCode, setShowCode] = useState(true);
    const [typedLines, setTypedLines] = useState(["", "", "", "", ""]);
    const [typing, setTyping] = useState(true);
    const [cursorVisible, setCursorVisible] = useState(true);

    const currentLineRef = useRef(0);
    const currentCharRef = useRef(0);

    const codeRef = useRef();
    const aboutRef = useRef();
    const typingInterval = useRef();
    const cursorTimer = useRef();

    // Cursor blink
    useEffect(() => {
        cursorTimer.current = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);
        return () => clearInterval(cursorTimer.current);
    }, []);

    // Typing animation logic
    useEffect(() => {
        if (!showCode) return;

        // Reset typing state
        currentLineRef.current = 0;
        currentCharRef.current = 0;
        setTypedLines(["", "", "", "", ""]);
        setTyping(true);

        if (typingInterval.current) clearInterval(typingInterval.current);

        typingInterval.current = setInterval(() => {
            setTypedLines(prev => {
                const updated = [...prev];
                const lineIdx = currentLineRef.current;
                const charIdx = currentCharRef.current;
                if (lineIdx < codeLines.length) {
                    updated[lineIdx] = codeLines[lineIdx].slice(0, charIdx);
                }
                return updated;
            });

            if (currentCharRef.current < codeLines[currentLineRef.current].length) {
                currentCharRef.current += 1;
            } else if (currentLineRef.current < codeLines.length - 1) {
                currentLineRef.current += 1;
                currentCharRef.current = 0;
            } else {
                // Done typing
                setTyping(false);
                clearInterval(typingInterval.current);
                setTimeout(() => handleTransition("toText"), 1000);
            }
        }, 18);

        return () => clearInterval(typingInterval.current);
    }, [showCode]);

    // Transition handler
    function handleTransition(target) {
        if (target === "toText") {
            gsap.to(codeRef.current, {
                opacity: 0,
                y: 40,
                pointerEvents: "none",
                duration: 0.35,
                onComplete: () => {
                    setShowCode(false);
                    gsap.fromTo(
                        aboutRef.current,
                        { opacity: 0, y: -40 },
                        { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.42 }
                    );
                }
            });
        } else {
            gsap.to(aboutRef.current, {
                opacity: 0,
                y: 40,
                pointerEvents: "none",
                duration: 0.35,
                onComplete: () => {
                    setShowCode(true);
                    setTimeout(() => {
                        gsap.fromTo(
                            codeRef.current,
                            { opacity: 0, y: -40 },
                            { opacity: 1, y: 0, pointerEvents: "auto", duration: 0.42 }
                        );
                    }, 10);
                }
            });
        }
    }

    // Toggle view manually
    function toggleView() {
        if (showCode) {
            if (typingInterval.current) clearInterval(typingInterval.current);
            setTyping(false);
            handleTransition("toText");
        } else {
            handleTransition("toCode");
        }
    }

    // Hover animation for download
    useEffect(() => {
        if (downloadHover) {
            gsap.to(downloadRef.current, {
                color: "#FF5F00",
                scale: 1.1
            });
            window.dispatchEvent(new Event("Download-button-hover-on"));
        } else {
            gsap.to(downloadRef.current, {
                color: "#000",
                scale: 1
            });
            window.dispatchEvent(new Event("Download-button-hover-off"));
        }
    }, [downloadHover]);

    return (
        <div className="relative w-full max-w-2xl mx-auto p-8  rounded-xl bg-[#c8c8c8] select-none h-[550px]">

            {/* Toggle Button */}
            <div className="flex justify-end mb-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 font-medium">
                        {showCode ? "Code View" : "Text View"}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={!showCode}
                            onChange={toggleView}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#FF5F00] transition duration-300"></div>
                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition-transform duration-300"></div>
                    </label>
                </div>
            </div>

            {/* Code Editor */}
            {/* Code Editor */}
<div
    ref={codeRef}
    style={{ display: showCode ? "" : "none", opacity: 1 }}
    className="rounded-lg overflow-hidden relative bg-[#18181B] border border-gray-700 h-full"
>
    <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-700">
        <span className="w-3 h-3 rounded-full bg-red-400 mr-2"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
        <span className="w-3 h-3 rounded-full bg-green-400"></span>
        <span className="ml-6 text-gray-200 text-sm font-mono select-none">about.js</span>
    </div>

    {/* Code Content with Wrapping */}
    <div className="flex h-full w-full overflow-hidden">
        {/* Line Numbers */}
        <div className="bg-gray-900 text-sm pt-4 px-4 font-mono text-gray-500 select-none">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((_, i) => (
                <div key={i} className="leading-relaxed">
                    {i + 1}
                </div>
            ))}
        </div>

        {/* Code Area */}
        <div className="overflow-auto py-4 pr-6 pl-2 w-full">
            {typedLines.map((line, i) => (
                <div
                    key={i}
                    className="whitespace-pre-wrap break-words text-sm text-white font-mono leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html:
                            syntaxHighlight(line) +
                            (i === currentLineRef.current && typing
                                ? `<span class="${cursorVisible ? "inline-block bg-pink-500" : "hidden"} w-1 h-6 align-middle" style="vertical-align: -2px"></span>`
                                : "")
                    }}
                />
            ))}
        </div>
    </div>
</div>

            {/* About Section */}
            <div
                ref={aboutRef}
                style={{ display: showCode ? "none" : "", opacity: showCode ? 0 : 1 }}
                className="flex flex-col space-y-8 h-full"
            >
                <div className="w-full h-full p-4">
                    <h3 className="text-3xl font-SpaceGrotesk ">The Engineer:</h3>
                    <p>
                        Rooted in computer science, I've spent years decoding the digital world—writing logic, building systems, and obsessing over clean code. Web development, 3D modeling, and game mechanics? Been there, built that.
                    </p>
                </div>
                <div className="w-full p-4 h-full">
                    <h3 className="text-3xl font-SpaceGrotesk ">The Creator:</h3>
                    <p>
                        But creativity is my catalyst. Whether I'm sculpting low-poly worlds or shaping immersive web experiences, I bring ideas to life with detail, delight, and a dash of daring.
                    </p>
                </div>
                <div className="w-full p-4 h-full">
                    <h3 className="text-3xl font-SpaceGrotesk ">The Balance:</h3>
                    <p>
                        I live at the intersection of art and algorithms—where precision meets play. And that's where I do my best work: turning technical know-how into creative magic.
                    </p>
                </div>
                <div className="w-full flex gap-10 p-4 h-full">
                    <h3
                        className="text-3xl font-Poppins cursor-pointer"
                        ref={downloadRef}
                        onMouseEnter={() => setDownloadHover(true)}
                        onMouseLeave={() => setDownloadHover(false)}
                    >
                        Download Resume
                    </h3>
                </div>
            </div>
        </div>
    );
}
