import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Manager from './pages/Manager';
import Executive from './pages/Executive';
import Admin from './pages/Admin';
import './styles/globals.css';

function App() {
  // For demo purposes, set userRole to 'admin' to show all features
  const userRole = 'admin'; // Change to 'employee' or 'manager' to test different roles

  return (
    <Router>
      <div className="app">
        <Navbar userRole={userRole} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/executive" element={<Executive />} />
            {userRole === 'admin' && (
              <Route path="/admin" element={<Admin />} />
            )}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
