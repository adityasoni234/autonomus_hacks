import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Network, Bell, User } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/manager', label: 'Manager' },
    { path: '/executive', label: 'Executive' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/projects', label: 'Projects' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <Network className={styles.icon} />
        <span className={styles.title}>Orchestrix</span>
      </div>

      <div className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.active : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <Bell size={20} />
        </button>
        <button className={styles.actionButton}>
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;