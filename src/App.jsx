import React, { useRef } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';


function App() {
  const h1Ref = useRef(null);
  const h1TargetRef = useRef(null);     

  return (
    <div className="App overflow-x-hidden">
      <Cursor />
      <Navbar />
      <Hero h1TargetRef={h1TargetRef} />
      <About h1TargetRef={h1TargetRef} />
      <Projects />
    </div>
  );
}

export default App;
