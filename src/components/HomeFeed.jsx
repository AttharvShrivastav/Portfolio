import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

// Array of image data for the feed
const images = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    alt: "Mountain Lake",
    label: "Nature"
  },
  {
    url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    alt: "Desert Dunes",
    label: "Travel"
  },
  {
    url: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    alt: "Puppy",
    label: "Animals"
  },
  {
    url: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=400&q=80",
    alt: "City Night",
    label: "Cityscape"
  },
  {
    url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    alt: "Beach Goldenhour",
    label: "Relax"
  },
  {
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    alt: "Books",
    label: "Inspire"
  },
  {
    url: "https://images.unsplash.com/photo-1465101178521-c1a9136a06b5?auto=format&fit=crop&w=400&q=80",
    alt: "Forest Sunbeams",
    label: "Woods"
  },
  {
    url: "https://images.unsplash.com/flagged/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=400&q=80",
    alt: "Ice Cream",
    label: "Dessert"
  },
  {
    url: "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=400&q=80",
    alt: "Bicycle Ride",
    label: "Lifestyle"
  },
  {
    url: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
    alt: "Colorful Wall",
    label: "Art"
  },
  {
    url: "https://images.unsplash.com/photo-1465101178521-c1a9136a06b5?auto=format&fit=crop&w=400&q=80",
    alt: "Spring Flowers",
    label: "Floral"
  },
  {
    url: "https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=400&q=80",
    alt: "Night Drive",
    label: "Mood"
  }
];

function HomeFeed() {
  const navigate = useNavigate(); // Initialize navigate hook

  // State to track the key sequence for the "go back" easter egg
  const [backKeySequence, setBackKeySequence] = useState([]);
  // Define a simple easter egg code for going back, e.g., 'Escape' key
  const GO_BACK_EASTER_EGG_CODE = ['Escape']; // Or choose a more complex sequence like ['KeyB', 'KeyA', 'KeyC', 'KeyK']

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Add the pressed key's code to the sequence
      const newSequence = [...backKeySequence, event.code].slice(-GO_BACK_EASTER_EGG_CODE.length);
      setBackKeySequence(newSequence);

      // Check if the current sequence matches the "go back" easter egg code
      const isMatch = GO_BACK_EASTER_EGG_CODE.every((code, index) => newSequence[index] === code);

      if (isMatch) {
        console.log('Go back easter egg triggered!');
        navigate(-1); // Navigate back to the previous page in history
        setBackKeySequence([]); // Reset the sequence after success
      }
    };

    // Add event listener for key presses
    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [backKeySequence, navigate]); // Dependencies: re-run effect if backKeySequence or navigate changes

  return (
    // Changed main background to match the light gray from the screenshot
    <div className="bg-gray-200 min-h-screen">
      {/* Header section with Pinterest-like branding and search */}
      {/* Changed Pinterest logo/text color and button color */}
      <header className="sticky top-0 bg-white z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Pinterest logo SVG - color changed to gray-800 */}
            <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20"><path d="M15.1 6.4A5.6 5.6 0 0 0 10 1a5.6 5.6 0 0 0-5.1 5.4C5 11.7 10 19 10 19s5-7.3 5.1-12.6zM10 8.2a2.3 2.3 0 1 1 0-4.6 2.3 2.3 0 0 1 0 4.6z"/></svg>
            {/* Pinterest text - color changed to gray-900 */}
            <span className="text-3xl font-bold text-gray-900 tracking-tight">Pinterest</span>
          </div>
          {/* Search input - bg-gray-100 is fine */}
          <input className="hidden md:block bg-gray-100 rounded-full px-6 py-2 outline-none w-80 focus:ring" placeholder="Search for ideas" />
          {/* Create button - background changed to gray-800, text to white */}
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full font-semibold shadow transition">Create</button>
        </div>
      </header>
      
      {/* Main content area for the image feed */}
      <main className="max-w-7xl mx-auto px-2 py-8">
        {/* Responsive grid layout using Tailwind's columns utility */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
          {images.map((image, idx) => (
            <div key={idx} className="relative mb-6 rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition break-inside-avoid">
              {/* Image with object-cover for consistent sizing */}
              <img className="w-full object-cover" src={image.url} alt={image.alt} />
              {/* Label overlay - bg-white/80 is fine for contrast */}
              <div className="absolute left-3 bottom-3 bg-white/80 rounded-full px-3 py-1 backdrop-blur text-xs font-semibold text-gray-700">{image.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomeFeed;
