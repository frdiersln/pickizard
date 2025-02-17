import React from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
  delay: number;
  position: {
    left: string;
    bottom: string;
  };
}

const FairyParticle: React.FC<ParticleProps> = ({ delay, position }) => {
  const randomX = Math.random() * 160 - 80; // -80 to 80px
  const randomY = -(40 + Math.random() * 80); // -40 to -120px
  const randomDuration = 3 + Math.random() * 2; // 3-5s

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-primary"
      initial={{ 
        opacity: 0,
        scale: 0,
        x: 0,
        y: 0
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: randomX,
        y: randomY,
      }}
      transition={{
        duration: randomDuration,
        delay: delay,
        ease: "easeOut",
      }}
      style={{
        ...position,
        filter: "blur(0.5px)",
        boxShadow: "0 0 12px #FFFAAF"
      }}
    />
  );
};

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  delay = 0,
  className = "",
  id
}) => {
  // Create particles with specific positions
  const particlePositions = [
    { left: '20%', bottom: '0%' },
    { left: '40%', bottom: '20%' },
    { left: '60%', bottom: '10%' },
    { left: '80%', bottom: '30%' },
    { left: '30%', bottom: '40%' },
    { left: '70%', bottom: '50%' },
    { left: '50%', bottom: '60%' },
    { left: '90%', bottom: '70%' },
  ];

  const particles = particlePositions.map((position, i) => (
    <FairyParticle 
      key={i} 
      delay={delay + i * 0.15} 
      position={position}
    />
  ));

  return (
    <motion.div
      id={id}
      initial={{ 
        opacity: 0, 
        y: 20,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: 1
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`relative ${className}`}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ isolation: 'isolate' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles}
      </div>
      <div className="relative z-20">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedSection;