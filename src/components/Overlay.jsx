import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

function Overlay() {
    const counterRef = useRef();
    const blackbarRef = useRef();
    const [counterValue, setCounterValue] = useState(0);
    const [overlayDone, setOverlayDone] = useState(false);

    useEffect(() => {
        const updateCounter = () => {
            setCounterValue(prev => {
                let newValue = prev + Math.floor(Math.random() * 10) + 1;
                if (newValue > 100) newValue = 100;

                if (newValue < 100) {
                    const delay = Math.floor(Math.random() * 200) + 50;
                    setTimeout(updateCounter, delay);
                }

                return newValue;
            });
        };

        updateCounter();
    }, []);

    // Trigger animations when counterValue hits 100
    useEffect(() => {
        if (counterValue === 100) {
            gsap.to(counterRef.current, {
                opacity: 0,
                duration: 0.5,
            });

            gsap.to(".bar", {
                delay: 1.5,
                height: 0,
                duration: 1,
                ease: "power2.inOut",
                stagger: {
                    amount: 0.5,
                },
            });

            // Mark overlay as done after the animations are expected to finish
            setTimeout(() => {
                setOverlayDone(true);
            }, 3000); // total delay (1.5 + 1 + some buffer)
        }
    }, [counterValue]);

    // Lower z-index after animation
    useEffect(() => {
        if (overlayDone) {
            gsap.set(counterRef.current, {
                zIndex: -1000,
            });

            gsap.set(blackbarRef.current, {
                zIndex: -1000,
            });
        }
    }, [overlayDone]);

    return (
        <div>
            <h1
                ref={counterRef}
                className="counter fixed w-full h-full flex justify-end items-end z-1000 text-white py-[0.2em] px-[0.4em] text-[20vw]"
            >
                {counterValue}
            </h1>

            <div ref={blackbarRef} className="overlay fixed w-[100vw] h-[100vh] z-999 flex">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        className="bar w-[10vw] h-[100vh] bg-[#1a1a1a]"
                    />
                ))}
            </div>
        </div>
    );
}

export default Overlay;
