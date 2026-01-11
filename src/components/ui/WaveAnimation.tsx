import React from 'react';
import styles from './WaveAnimation.module.css';

const WaveAnimation: React.FC = () => {
  return (
    <div className={styles.waveContainer}>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
      <div className={styles.wave}></div>
    </div>
  );
};

export default WaveAnimation;