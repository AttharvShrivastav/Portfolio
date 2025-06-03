import React, { useRef } from "react";
import DecryptedText from "./Animation/DecryptedText";

function Projects() {


  const projectCardRef = useRef(null)
     return (
          <div className="h-[160vh] cursor-none w-full bg-page-bg">
               {/* Example 2: Customized speed and characters */}
               <DecryptedText
                    text="PROJECTS"
                    speed={100}
                    maxIterations={20}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters text-7xl"
                    encryptedClassName="encrypted"
               />

               <div className="h-auto w-full flex flex-col bg-amber-200">
                    <div className="flex w-full h-full flex-row">
                         <div ref={projectCardRef} className="bg-red-100 w-full h-[80vh]"></div>
                         <div className="bg-red-200 w-full h-[80vh]"></div>
                    </div>
                    <div className="flex flex-row w-full h-full">
                         <div className="bg-red-300 w-full h-[80vh]"></div>
                         <div className="bg-red-400 w-full h-[80vh]"></div>
                    </div>
               </div>
          </div>
     );
}

export default Projects;
