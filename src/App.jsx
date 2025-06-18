import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
// Ensure these components exist in your './components/' directory:
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Overlay from './components/Overlay';
import Footer from './components/Footer';
import HomeFeed from './components/HomeFeed'; // This new component will be defined below

function App() {
  const h1Ref = useRef(null); // Assuming this is still used in other components
  const h1TargetRef = useRef(null); // Assuming this is still used in other components
  const navigate = useNavigate(); // Hook to programmatically navigate within the router

  // State to track the easter egg key sequence
  const [keySequence, setKeySequence] = useState([]);
  // Konami Code: Up, Up, Down, Down, Left, Right, B, A
  const EASTER_EGG_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Add the pressed key's code to the sequence, maintaining only the necessary length
      const newSequence = [...keySequence, event.code].slice(-EASTER_EGG_CODE.length);
      setKeySequence(newSequence);

      // Check if the current sequence matches the full easter egg code
      const isMatch = EASTER_EGG_CODE.every((code, index) => newSequence[index] === code);

      if (isMatch) {
        // If the full sequence matches, trigger the easter egg
        console.log('Easter egg unlocked! Navigating to secret feed.');
        navigate('/secret-feed'); // Navigate to the secret home feed page
        setKeySequence([]); // Reset the sequence after success
      }
      // No 'else if' for resetting needed here, as slice ensures length, and
      // the `every` check handles partial mismatches naturally.
    };

    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence, navigate]); // Dependencies: re-run effect if keySequence or navigate changes

  return (
    <div className="App overflow-x-hidden">
      <Cursor />
      <Overlay />
      {/*
        The main application content is now wrapped in a Route.
        The easter egg page is a separate route.
      */}
      <Routes>
        {/* Route for the main application content */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero h1TargetRef={h1TargetRef} />
              <About h1TargetRef={h1TargetRef} />
              <Projects />
              <Footer />
            </>
          }
        />
        {/* Route for the secret home feed page, accessible via the easter egg */}
        <Route path="/secret-feed" element={<HomeFeed />} />
      </Routes>
    </div>
  );
}

// Wrap the App component with BrowserRouter to enable routing for its children
export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
