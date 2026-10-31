import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { getGuestFromLocation } from '../lib/invite';

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const guestName = getGuestFromLocation();

  const handleStart = () => {
    setShowButton(false);
    setIsPlaying(true);
    if (onMusicStart) onMusicStart();
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#050505] z-[100] flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        src="/images/greenopening.mp4"
        className="absolute w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: isPlaying ? 1 : 0.3 }}
        playsInline
        preload="auto"
        muted
        onEnded={handleVideoEnd}
      />
      
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10"
          >
            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent to-brand-gold/50 mb-8" />
            {guestName && (
              <div className="text-center mb-8 px-6">
                <span className="block font-sans uppercase tracking-[0.4em] text-[10px] text-white/70 mb-3">Dear</span>
                <span className="block font-display text-3xl sm:text-4xl text-white drop-shadow-lg">{guestName}</span>
              </div>
            )}
            <button
              onClick={handleStart}
              className="px-10 py-4 bg-transparent border border-brand-gold/40 text-brand-gold-light font-sans uppercase tracking-[0.4em] text-xs hover:bg-brand-gold hover:text-white transition-all duration-700 rounded-full shadow-[0_0_30px_rgba(193,18,31,0.1)]"
            >
              Open Invitation
            </button>
            <div className="w-[1px] h-24 bg-gradient-to-t from-transparent to-brand-gold/50 mt-8" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Skip button for convenience */}
      {!showButton && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          onClick={handleVideoEnd}
          className="absolute bottom-8 right-8 text-white/50 hover:text-white font-sans uppercase tracking-[0.2em] text-[10px] transition-colors z-20"
        >
          Skip Video
        </motion.button>
      )}
    </div>
  );
}
