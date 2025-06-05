import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function ProjectCard({ bgColor = "bg-red-100", projectImage ,text1 = "Text One", text2 = "Text Two", projectName= "Project1" }) {
    const [isHovered, setIsHovered] = useState(false);

    const imageRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const projectHeadingRef = useRef(null);

    useEffect(() => {
        if (!imageRef.current || !text1Ref.current || !text2Ref.current || !projectHeadingRef.current) return;

        gsap.to(projectHeadingRef.current,{
            opacity: isHovered? 0: 1,
        })

        gsap.to(imageRef.current, {
            height: isHovered ? "350px" : "0px",
            duration: 0.5,
            ease: "power2.out",
        });

        gsap.to([text1Ref.current, text2Ref.current], {
            opacity: isHovered ? 1 : 0,
            duration: 0.5,
            ease: "power2.out",
        });
    }, [isHovered]);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`${bgColor} w-full relative h-[80vh] overflow-hidden flex items-center justify-around`}
        >
            <img src={projectImage} className="w-full h-full object-fit z-0" />
            <h1 ref={projectHeadingRef} className="absolute text-4xl font-SpaceGrotesk">{projectName}</h1>

            <div className="overlay-container gap-10 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 flex items-center justify-center">
                <p ref={text1Ref} className="bg-amber-500 z-10 opacity-0"> {text1} </p>
                <div
                    ref={imageRef}
                    className="bg-amber-100 h-[0] w-[400px] z-10 "
                ></div>
                <p ref={text2Ref} className="bg-amber-500 z-10 opacity-0"> {text2} </p>
            </div>
        </div>
    );
}

export default ProjectCard;
