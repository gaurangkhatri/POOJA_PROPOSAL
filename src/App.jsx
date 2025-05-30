import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

function App() {
  const [response, setResponse] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null); // useRef to control audio

  const handleYes = () => {
    setResponse('yes');
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Try to play music after interaction
    if (audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Audio autoplay blocked:", e);
      });
    }
  };

  return (
    <main className="min-h-screen bg-pink-50 flex items-center justify-center p-6 relative overflow-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute animate-pulse w-full h-full bg-gradient-to-br from-pink-100 via-white to-pink-200 opacity-30"></div>
      </div>

      {/* Audio tag with ref and no autoplay */}
      <audio ref={audioRef} loop>
        <source src="/romantic-music.mp3.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 max-w-xl text-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-pink-600 text-4xl font-bold mb-4">Pooja,</div>
        <p className="text-lg text-gray-700 mb-6">
          From the moment I met you, I knew you were special. Your smile, your kindness, and the way you light up every room — it all made me fall for you. 💖
        </p>
        <h2 className="text-2xl font-semibold text-pink-500 mb-6">
          Will you make me the happiest person alive and be mine? 🌸
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
