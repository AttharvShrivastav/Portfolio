import React from 'react'
import { motion } from "motion/react"

function Navbar() {
  return (
    <div className='bg-[#C8C8C8]'>
        <div className=" font-SpaceGrotesk text-2xl nav-holder flex items-center justify-center gap-20 w-full h-[10vh]">
            {["Home", "Projects", "Contact"].map((item) => (
          <motion.h1
            key={item}
            className='p-2 rounded cursor-none'
            initial={{ scale: 1 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: "#171717",
              color: "#f6f6f6",
              transition: { duration: 0.4, ease: "easeIn" },
            }}
            animate={{ scale: 1 }}
          >
            {item}
          </motion.h1>))}
        </div>
    </div>
  )
}

export default Navbar


// function Navbar() {
//   return (
//     <div>
//       <div className="font-SpaceGrotesk text-2xl nav-holder flex items-center justify-center gap-20 w-full h-[10vh]">
//         {["Home", "Projects", "Contact"].map((item) => (
//           <motion.div
//             key={item}
//             className="relative rounded h-[40px] w-[120px] overflow-hidden flex items-center justify-center"
//             whileHover={{ scale: 1.2 }}
//           >
//             <motion.div
//               initial={{ y: 0 }}
//               whileHover={{ y: -40, transition: { duration: 0.5, ease: "easeOut" } }}
//               className="absolute rounded w-full text-center"
//             >
//               {item}
//             </motion.div>
//             <motion.div
//               initial={{ y: 40 }}
//               whileHover={{ y: 0, transition: { duration: 0.5, ease: "easeOut" } }}
//               className="absolute w-full text-center text-white bg-[#171717] p-2 rounded"
//             >
//               {item}
//             </motion.div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Navbar;