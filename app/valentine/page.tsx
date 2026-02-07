"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
// Try to import generic icon if specific one fails, but HeartIcon is standard.
// If hugeicons-react doesn't have it, we might need a backup or check the docs. 
// Assuming it works based on standard icon lib patterns.
import { FavouriteIcon } from "hugeicons-react";

export default function ValentinePage() {
    const [accepted, setAccepted] = useState(false);
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });

    // Confetti effect when accepted
    useEffect(() => {
        if (accepted) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: randomInRange(0.5, 0.6) }, // Top left-ish
                    colors: ["#ff0000", "#ff69b4", "#800080"], // Red, Pink, Purple
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: randomInRange(0.5, 0.6) }, // Top right-ish
                    colors: ["#ff0000", "#ff69b4", "#800080"],
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [accepted]);

    // Magnet effect for "No" button
    const runAway = () => {
        // Move further away
        const x = Math.random() * 300 - 150;
        const y = Math.random() * 300 - 150;
        setNoBtnPosition({ x, y });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-red-200 to-purple-300 overflow-hidden relative">
            {/* Decorative background elements */}
            <div className="absolute top-10 left-10 text-pink-400 opacity-50 text-8xl animate-bounce">💖</div>
            <div className="absolute bottom-20 right-20 text-purple-400 opacity-50 text-8xl animate-pulse">💜</div>

            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="question"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        className="text-center z-10 flex flex-col items-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mb-8 text-red-600"
                        >
                            <FavouriteIcon size={80} variant="solid" className="fill-current drop-shadow-xl" />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-700 mb-12 drop-shadow-sm font-serif p-4">
                            Will you be my Valentine?
                        </h1>

                        <div className="flex flex-col md:flex-row gap-8 items-center justify-center relative w-full max-w-md h-32">
                            <motion.button
                                onClick={() => setAccepted(true)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-gradient-to-r from-red-300 to-pink-400 text-white rounded-full text-2xl font-bold shadow-lg hover:shadow-2xl transition-all z-20"
                            >
                                Yes! ❤️
                            </motion.button>

                            <motion.button
                                onMouseEnter={runAway}
                                onTouchStart={runAway}
                                animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                className="absolute md:static px-8 py-4 bg-white/50 backdrop-blur-sm text-gray-600 rounded-full text-xl font-bold shadow-sm border border-white/50 cursor-not-allowed"
                                style={{ left: '60%' }} // Initial position hint for absolute
                            >
                                No 😢
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="confession"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-center z-10 p-10 bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 max-w-2xl mx-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1, rotate: 360 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mb-8 inline-block"
                        >
                            <div className="relative">
                                <FavouriteIcon size={120} variant="solid" className="text-red-500 drop-shadow-2xl animate-pulse" />
                            </div>
                        </motion.div>

                        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6 font-serif">
                            I Knew You'd Say Yes!
                        </h2>

                        <p className="text-xl md:text-3xl text-gray-900 leading-relaxed font-medium font-serif italic">
                            You make every day feel like Valentine's Day. <br />
                            I love you! 💖🌹
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
