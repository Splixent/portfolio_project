import React from 'react';
import { motion } from 'framer-motion';
import styles from './IntroAnimation.module.css';

const IntroAnimation = ({ onComplete }) => {
  return (
    <motion.div 
      className={styles.introOverlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 2.5 }}
      onAnimationComplete={onComplete}
    >
      <div className={styles.introContent}>
        <motion.div
          className={styles.logoContainer}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.6, 0.01, -0.05, 0.95]
          }}
        >
          <img
            src="/personallogo-1@2x.png"
            alt="Logo"
            className={styles.logo}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={styles.text}
        >
          <motion.div
            animate={{ color: ['#FFFFFF', '#DC143C', '#FFFFFF'] }}
            transition={{ duration: 2, times: [0, 0.5, 1], repeat: 0 }}
            className={styles.name}
          >
            Tomi Okelana
          </motion.div>
          <motion.div className={styles.title}>
            Software Engineer
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroAnimation;
