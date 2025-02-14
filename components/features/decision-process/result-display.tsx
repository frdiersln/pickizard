import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ResultDisplayProps {
  winner: {
    imageUrl: string;
    name: string;
  };
}

const shakeSparkleVariants = {
  initial: { 
    scale: 0,
    opacity: 0,
    x: 0,
    y: 0,
    rotate: 0
  },
  animate: { 
    scale: [0, 1, 1, 1, 0],
    opacity: [0, 1, 1, 1, 0],
    x: [0, -2, 2, -2, 0],
    y: [0, 2, -2, 2, 0],
    rotate: [0, -10, 10, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 0.3,
      ease: "easeInOut"
    }
  }
};

const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const glowVariants = {
  initial: { textShadow: "0 0 0px rgba(255,255,255,0)" },
  animate: {
    textShadow: [
      "0 0 4px rgba(255,255,255,0.7)",
      "0 0 8px rgba(255,255,255,0.9)",
      "0 0 4px rgba(255,255,255,0.7)"
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const borderVariants = {
  initial: { 
    background: "linear-gradient(90deg, #ff69b4, #4169e1, #ffd700, #ff69b4)",
    backgroundSize: "300% 300%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export default function ResultDisplay({ winner }: ResultDisplayProps) {
  return (
    <>
      {winner && (
        <div className='result-display flex flex-col gap-4 mt-16 items-center justify-center w-full h-fit'>
          <motion.h1 
            className='text-4xl text-primary relative'
            initial="initial"
            animate="animate"
            variants={textVariants}
          >
            That&apos;s Your Pick
            <motion.span 
              className="absolute -right-8 -translate-y-1/2"
              variants={shakeSparkleVariants}
              initial="initial"
              animate="animate"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.span>
          </motion.h1>
          
          <motion.div 
            className="relative w-[89%] p-[3px] rounded-lg overflow-hidden"
            variants={borderVariants}
            initial="initial"
            animate="animate"
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
            {winner.imageUrl ? (
              <img 
                src={winner.imageUrl} 
                alt={winner.name} 
                className="w-full object-cover rounded-lg"
              />
            ) : (
              <div className="w-full aspect-[5/3] flex items-center justify-center bg-gray-100">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-gradient-to-t from-background/60 to-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.h3 
                  className="text-primary text-center text-xl font-semibold relative"
                  initial="initial"
                  animate="animate"
                  variants={glowVariants}
                >
                  {winner.name}
                </motion.h3>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}