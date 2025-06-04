import React from "react";
import DecryptedText from "./Animation/DecryptedText";
import ProjectCard from "./ProjectCard";
import project1Img from "../assets/images/HTML-Markdown.png"

function Projects() {
    return (
        <div className="h-[160vh] cursor-none w-full bg-page-bg">
          {/* <h1 className="text-7xl p-10">Projects</h1> */}
            <DecryptedText
                text="PROJECTS"
                speed={100}
                maxIterations={20}
                characters="ABCD1234!?"
                className="revealed"
                parentClassName="all-letters text-7xl p-5"
                encryptedClassName="encrypted"
            />

            <div className="h-auto w-full flex flex-col bg-amber-200">
                {/* First Row */}
                <div className="flex w-full h-full flex-row">
                    <ProjectCard bgColor="bg-red-100" projectImage={project1Img} text1="Card 1 - A" text2="Card 1 - B" projectName="" />
                    <ProjectCard bgColor="bg-red-200" text1="Card 2 - A" text2="Card 2 - B" projectName="Furniture Ecommerce App"/>
                </div>

                {/* Second Row */}
                <div className="flex flex-row w-full h-full">
                    <ProjectCard bgColor="bg-red-300" text1="Card 3 - A" text2="Card 3 - B" projectName="Quiz Taking App" />
                    <ProjectCard bgColor="bg-red-400" text1="Card 4 - A" text2="Card 4 - B" projectName="Martian Mike 2D Platformer"/>
                </div>
            </div>
        </div>
    );
}

export default Projects;
