import React from 'react'
import DecryptedText from './Animation/DecryptedText'
function Projects() {
  return (
    <div className='h-[100vh] cursor-none w-full bg-cyan-800'> 

        {/* Example 2: Customized speed and characters */}
        <DecryptedText
        text="Projects"
        speed={100}
        maxIterations={20}
        characters="ABCD1234!?"
        className="revealed "
        parentClassName="all-letters text-7xl font-SpaceGrotesk font-normal p-20"
        encryptedClassName="encrypted"
        />

        <div className='h-auto w-full flex flex-col bg-amber-200'>

             <div className='flex w-full h-full flex-row'>

                <div className="bg-red-100 w-full h-[80vh]"></div>
                <div className="bg-red-200 w-full h-[80vh]"></div>

            </div>
            <div className='flex flex-row w-full h-full'>
                <div className="bg-red-300 w-full h-[80vh]"></div>
                <div className="bg-red-400 w-full h-[80vh]"></div>
            </div>
        </div>
    
    </div>
  )
}

export default Projects