import React, { useRef } from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Overlay from './components/Overlay';
import Footer from './components/Footer';


function App() {
  const h1Ref = useRef(null);
  const h1TargetRef = useRef(null);     

  return (
    <div className="App overflow-x-hidden">
      <Cursor />
      <Overlay />
      <Navbar />
      <Hero h1TargetRef={h1TargetRef} />
      <About h1TargetRef={h1TargetRef} />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
