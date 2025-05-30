import React, { useState, useRef, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [response, setResponse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);
  const confettiIntervalRef = useRef(null); // to track the interval

  const fireHeartConfetti = () => {
    const heart = confetti.shapeFromPath({
      path: "M362.7 64C318 64 275.5 93.7 256 123.7 236.5 93.7 194 64 149.3 64 87.5 64 32 117.6 32 183.7 32 268 128.6 326.9 243.3 431.7a32 32 0 0 0 45.3 0C383.4 326.9 480 268 480 183.7 480 117.6 424.5 64 362.7 64z",
      matrix: [0.08, 0, 0, 0.08, 0, 0]
    });

    // Run continuously until user leaves or reloads
    confettiIntervalRef.current = setInterval(() => {
      confetti({
        startVelocity: 20,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 5,
        shapes: [heart],
        colors: ['#ff69b4', '#ff1493', '#ffb6c1'],
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);
  };

  const handleYes = () => {
    setResponse('yes');
    setShowConfetti(true);
    fireHeartConfetti();

    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Audio autoplay blocked:", e);
      });
    }
  };

  useEffect(() => {
    return () => {
      // Clean up confetti interval if component unmounts
      if (confettiIntervalRef.current) {
        clearInterval(confettiIntervalRef.current);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti numberOfPieces={300} recycle />}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute animate-pulse w-full h-full bg-gradient-to-br from-pink-100 via-white to-pink-200 opacity-30"></div>
      </div>

      <audio ref={audioRef} loop>
        <source src="/romantic-music.mp3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-pink-600 text-4xl font-bold mb-2">Pooja,</div>

        <p className="text-lg text-gray-700 mb-4">
          From the moment our paths crossed, something deep inside told me this was the beginning of something beautiful. 🌟
        </p>

        <p className="text-lg text-gray-700 mb-4">
          You have the most incredible heart, the kindest soul, and a smile that melts away the toughest days. Every moment with you feels like magic — your laugh, your energy, your unwavering support — all of it has become my favorite place to be. 💖
        </p>

        <p className="text-lg text-gray-700 mb-4 italic">
          “You don’t marry someone you can live with – you marry the person you can’t live without.” – Unknown
        </p>

        <p className="text-lg text-gray-700 mb-6">
          I want to be there for you — in every sunrise, every challenge, every celebration. I want to grow with you, cheer for you, and build a life that we both dream of. A life full of silly laughs, midnight chai, spontaneous trips, and endless love.
        </p>

        <h2 className="text-2xl font-semibold text-pink-500 mb-6">
          So here I am, with all my heart — asking you...  
          <br />
          Will you make me the happiest person in the world, and be mine forever? 💍💞
        </h2>

        {!response && (
          <div className="flex justify-center gap-4">
            <button
              className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-full"
              onClick={handleYes}
            >
              Yes 💍
            </button>
            <button
              className="text-pink-500 border border-pink-300 text-lg px-6 py-3 rounded-full"
              onClick={() => setResponse('no')}
            >
              Let me think 😅
            </button>
          </div>
        )}

        {response === 'yes' && (
          <motion.div
            className="text-green-600 text-xl font-semibold mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Yay! You said yes! 💖 I can't wait to start this beautiful journey with you! 🌹
          </motion.div>
        )}

        {response === 'no' && (
          <motion.div
            className="text-gray-500 text-xl font-medium mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            That's okay. I'll always cherish our moments and wish you nothing but happiness. 💐
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

export default App;
