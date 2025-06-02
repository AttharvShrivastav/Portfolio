import React, { useRef } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutToggle from './components/AboutToggle';
// import Projects from './components/Projects';


function App() {
  const h1Ref = useRef(null);           // For the Hero H1
  const h1TargetRef = useRef(null);     // For the target div in About

  return (
    <div className="App overflow-x-hidden">
       <Cursor />
      <Navbar />
      <Hero h1TargetRef={h1TargetRef} />
      <About h1TargetRef={h1TargetRef} />
      {/* <Projects /> */}
      {/* <AboutToggle></AboutToggle> */}
      
    </div>
  );
}

export default App;
