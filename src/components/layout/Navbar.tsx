import React from 'react';
import { Link } from 'react-router-dom';
import { Network } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Network className={styles.icon} />
        <span className={styles.title}>Orchestrix</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.registerButton}>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;