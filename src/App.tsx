import React, { useState, useEffect } from 'react';
import { Network, Brain, Users, TrendingUp, Bell, User, Search, Calendar, Target, Shield, Settings, BarChart3, Activity } from 'lucide-react';

// Advanced Shader Background with Flowing Waves
const ShaderBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('shader-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let time = 0;
    const waves = [];
    
    // Create flowing wave lines
    for (let i = 0; i < 15; i++) {
      waves.push({
        amplitude: 80 + Math.random() * 120,
        frequency: 0.008 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        speed: 0.8 + Math.random() * 1.2,
        yOffset: canvas.height * 0.2 + i * 40,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    
    const animate = () => {
      time += 0.015;
      
      // Dark gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.5, 0,
        canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.8
      );
      gradient.addColorStop(0, '#0f0a1a');
      gradient.addColorStop(0.4, '#1a0d2e');
      gradient.addColorStop(0.8, '#2d1b4e');
      gradient.addColorStop(1, '#0a0a0f');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw flowing wave lines with radiant purple
      waves.forEach((wave, index) => {
        ctx.beginPath();
        
        // Create radiant purple gradient for each wave
        const waveGradient = ctx.createLinearGradient(0, wave.yOffset - 50, 0, wave.yOffset + 50);
        waveGradient.addColorStop(0, `rgba(147, 51, 234, 0)`);
        waveGradient.addColorStop(0.5, `rgba(147, 51, 234, ${wave.opacity * (0.6 + 0.4 * Math.sin(time * 0.5 + index))})`);
        waveGradient.addColorStop(1, `rgba(147, 51, 234, 0)`);
        
        ctx.strokeStyle = waveGradient;
        ctx.lineWidth = 3 + Math.sin(time + index) * 1.5;
        
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = wave.yOffset + 
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.8) * wave.amplitude * 0.4 +
            Math.sin(x * wave.frequency * 0.5 + time * wave.speed * 1.3) * wave.amplitude * 0.2;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Add intense glow effect
        ctx.shadowColor = '#9333ea';
        ctx.shadowBlur = 20;
        ctx.stroke();
        
        // Double glow for more radiance
        ctx.shadowBlur = 40;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
      
      // Add interconnected wave patterns
      for (let i = 0; i < waves.length - 1; i++) {
        const wave1 = waves[i];
        const wave2 = waves[i + 1];
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * Math.sin(time + i)})`;
        ctx.lineWidth = 1;
        
        for (let x = 0; x <= canvas.width; x += 20) {
          const y1 = wave1.yOffset + Math.sin(x * wave1.frequency + time * wave1.speed + wave1.phase) * wave1.amplitude;
          const y2 = wave2.yOffset + Math.sin(x * wave2.frequency + time * wave2.speed + wave2.phase) * wave2.amplitude;
          
          if (x === 0) {
            ctx.moveTo(x, y1);
          } else {
            ctx.lineTo(x, (y1 + y2) / 2);
          }
        }
        
        ctx.stroke();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <canvas 
      id="shader-canvas" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
};

// Navigation Sidebar
const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'tasks', label: 'Tasks', icon: Target },
    { id: 'manager', label: 'Manager View', icon: Users },
    { id: 'insights', label: 'AI Insights', icon: Brain }
  ];
  
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      width: '260px',
      height: '100vh',
      background: 'rgba(26, 26, 46, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '2rem 0',
      zIndex: 100
    }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Network size={28} style={{ color: '#3b82f6' }} />
          <h2 style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Orchestrix</h2>
        </div>
      </div>
      
      {navItems.map(item => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              padding: '1rem 1.5rem',
              color: currentPage === item.id ? '#3b82f6' : '#b8bcc8',
              background: currentPage === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.2s ease',
              borderLeft: currentPage === item.id ? '3px solid #3b82f6' : '3px solid transparent'
            }}
          >
            <Icon size={20} />
            <span style={{ fontWeight: currentPage === item.id ? '600' : '400' }}>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// Top Navigation
const TopNav = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '70px',
    background: 'rgba(26, 26, 46, 0.9)',
    backdropFilter: 'blur(15px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    zIndex: 99
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{
        background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
        padding: '0.5rem',
        borderRadius: '0.75rem'
      }}>
        <Network size={24} style={{ color: 'white' }} />
      </div>
      <h2 style={{ 
        color: 'transparent',
        background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        fontSize: '1.3rem', 
        fontWeight: 'bold', 
        margin: 0 
      }}>Orchestrix</h2>
    </div>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <button style={{
        padding: '0.5rem 1.5rem',
        background: 'transparent',
        color: '#b8bcc8',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}>Login</button>
      <button style={{
        padding: '0.5rem 1.5rem',
        background: 'linear-gradient(135deg, #3b82f6, #9333ea)',
        color: 'white',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
      }}>Register</button>
    </div>
  </div>
);

// Landing Page
const Landing = ({ setCurrentPage }) => (
  <div style={{ minHeight: '100vh', paddingTop: '70px' }}>
    <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '1000px' }}>
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: 'bold',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1.1'
        }}>Orchestrix</h1>
        
        <p style={{
          fontSize: '1.5rem',
          color: '#b8bcc8',
          marginBottom: '1rem',
          fontWeight: '500'
        }}>AI assigns the right role to the right person at the right time</p>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#6b7280',
          marginBottom: '3rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>Transform your team's productivity with intelligent work orchestration that understands context, predicts bottlenecks, and optimizes execution.</p>
        
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '5rem' }}>
          <button
            onClick={() => setCurrentPage('dashboard')}
            style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}
          >View Dashboard</button>
          <button
            onClick={() => window.open('/admin', '_blank')}
            style={{
              padding: '1rem 2.5rem',
              background: 'rgba(26, 26, 46, 0.8)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '0.75rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backdropFilter: 'blur(10px)'
            }}
          >Admin Panel</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { title: 'Dynamic Role Assignment', desc: 'AI automatically assigns optimal roles based on skills, workload, and project context', icon: Users },
            { title: 'AI Task Orchestration', desc: 'Intelligent task distribution that adapts to team dynamics and changing requirements', icon: Target },
            { title: 'Predictive Project Intelligence', desc: 'Get ahead of bottlenecks with AI-powered predictions and strategic recommendations', icon: Brain },
            { title: 'Smart Workload Balancing', desc: 'Prevent burnout and optimize productivity with intelligent capacity management', icon: TrendingUp }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} style={{
                padding: '2rem',
                background: 'rgba(26, 26, 46, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <Icon size={32} style={{ color: '#3b82f6' }} />
                </div>
                <h3 style={{ color: '#3b82f6', fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>{feature.title}</h3>
                <p style={{ color: '#b8bcc8', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

// Team Dashboard
const TeamDashboard = () => (
  <div style={{ padding: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', fontWeight: 'bold' }}>Your Dashboard</h1>
      <p style={{ color: '#b8bcc8', fontSize: '1.1rem' }}>AI-curated tasks and insights for your role</p>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div>
        <h2 style={{ color: '#3b82f6', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>AI-Recommended Tasks</h2>
        {[
          { title: 'Review API Documentation', role: 'Technical Reviewer', priority: 'High', ai: 'Assigned based on your backend expertise and current workload', deadline: '2 hours' },
          { title: 'Sprint Planning Meeting', role: 'Participant', priority: 'Medium', ai: 'Your input needed on timeline estimates for Q4 features', deadline: '1 day' },
          { title: 'Code Review: Auth Module', role: 'Senior Reviewer', priority: 'High', ai: 'Matches your security knowledge and previous auth work', deadline: '4 hours' }
        ].map((task, i) => (
          <div key={i} style={{
            padding: '1.5rem',
            background: 'rgba(26, 26, 46, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            marginBottom: '1rem',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600' }}>{task.title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{
                  background: task.priority === 'High' ? '#ef4444' : '#f59e0b',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>{task.priority}</span>
                <span style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>{task.deadline}</span>
              </div>
            </div>
            <div style={{ color: '#3b82f6', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '500' }}>Role: {task.role}</div>
            <div style={{
              color: '#b8bcc8',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              background: 'rgba(59, 130, 246, 0.1)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              borderLeft: '3px solid #3b82f6'
            }}>
              <Brain size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              {task.ai}
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h2 style={{ color: '#3b82f6', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>Workload & Insights</h2>
        
        <div style={{
          padding: '1.5rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Current Capacity</h3>
          <div style={{ background: '#1f2937', height: '12px', borderRadius: '6px', marginBottom: '0.75rem', overflow: 'hidden' }}>
            <div style={{
              background: 'linear-gradient(90deg, #10b981, #059669)',
              height: '100%',
              width: '75%',
              borderRadius: '6px',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
          <p style={{ color: '#b8bcc8', fontSize: '0.9rem' }}>75% utilized - Optimal range</p>
          <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem' }}>✓ Healthy workload distribution</p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem'
        }}>
          <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600' }}>Smart Notifications</h3>
          <div style={{
            padding: '0.75rem',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <div style={{ color: '#f59e0b', fontSize: '0.9rem', fontWeight: '500' }}>⚠️ Sprint deadline approaching</div>
            <div style={{ color: '#b8bcc8', fontSize: '0.8rem', marginTop: '0.25rem' }}>3 tasks due in next 6 hours</div>
          </div>
          <div style={{
            padding: '0.75rem',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '0.5rem'
          }}>
            <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: '500' }}>✅ Great code review velocity</div>
            <div style={{ color: '#b8bcc8', fontSize: '0.8rem', marginTop: '0.25rem' }}>40% faster than team average</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Tasks Page
const TasksPage = () => {
  const columns = ['To Do', 'In Progress', 'Review', 'Done'];
  const tasks = {
    'To Do': [
      { title: 'Setup CI/CD Pipeline', assignee: 'AI Suggested: You', priority: 'High' },
      { title: 'Database Migration', assignee: 'Unassigned', priority: 'Medium' }
    ],
    'In Progress': [
      { title: 'API Integration', assignee: 'John D.', priority: 'High' }
    ],
    'Review': [
      { title: 'Frontend Components', assignee: 'Sarah M.', priority: 'Medium' }
    ],
    'Done': [
      { title: 'Database Schema', assignee: 'Mike R.', priority: 'Low' }
    ]
  };
  
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', fontWeight: 'bold' }}>Tasks Board</h1>
        <p style={{ color: '#b8bcc8', fontSize: '1.1rem' }}>AI-powered task orchestration and role assignment</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        {columns.map(column => (
          <div key={column} style={{
            background: 'rgba(26, 26, 46, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ color: '#3b82f6', fontSize: '1.2rem', fontWeight: '600' }}>{column}</h3>
              <span style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                fontWeight: '600'
              }}>{(tasks[column] || []).length}</span>
            </div>
            
            {(tasks[column] || []).map((task, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '1rem',
                borderRadius: '0.75rem',
                marginBottom: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '0.95rem' }}>{task.title}</div>
                  <span style={{
                    background: task.priority === 'High' ? '#ef4444' : task.priority === 'Medium' ? '#f59e0b' : '#10b981',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.7rem',
                    fontWeight: '600'
                  }}>{task.priority}</span>
                </div>
                <div style={{ color: '#b8bcc8', fontSize: '0.85rem' }}>{task.assignee}</div>
                {task.assignee.includes('AI Suggested') && (
                  <div style={{
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '0.5rem',
                    fontSize: '0.8rem',
                    color: '#3b82f6'
                  }}>
                    <Brain size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                    AI assigned based on your DevOps expertise
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// Manager Dashboard
const ManagerDashboard = () => (
  <div style={{ padding: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', fontWeight: 'bold' }}>Manager Dashboard</h1>
      <p style={{ color: '#b8bcc8', fontSize: '1.1rem' }}>Team oversight and strategic project insights</p>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      {[
        { label: 'Project Health', value: '87%', color: '#10b981' },
        { label: 'Team Velocity', value: '42', color: '#3b82f6' },
        { label: 'Risk Score', value: '23%', color: '#f59e0b' },
        { label: 'On-Time Delivery', value: '94%', color: '#10b981' }
      ].map((metric, i) => (
        <div key={i} style={{
          padding: '1.5rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: metric.color, marginBottom: '0.5rem' }}>{metric.value}</div>
          <div style={{ color: '#b8bcc8', fontSize: '0.9rem' }}>{metric.label}</div>
        </div>
      ))}
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
      <div style={{
        padding: '1.5rem',
        background: 'rgba(26, 26, 46, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem'
      }}>
        <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>AI Strategic Recommendations</h3>
        {[
          { title: 'Resource Reallocation', desc: 'Move 2 developers from Project Beta to Alpha to reduce delivery risk by 40%', confidence: '94%' },
          { title: 'Sprint Optimization', desc: 'Adjust task complexity distribution to increase team velocity by 15%', confidence: '87%' }
        ].map((rec, i) => (
          <div key={i} style={{
            padding: '1rem',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>{rec.title}</div>
            <div style={{ color: '#b8bcc8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rec.desc}</div>
            <div style={{ color: '#3b82f6', fontSize: '0.8rem' }}>Confidence: {rec.confidence}</div>
          </div>
        ))}
      </div>
      
      <div style={{
        padding: '1.5rem',
        background: 'rgba(26, 26, 46, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem'
      }}>
        <h3 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.3rem', fontWeight: '600' }}>Team Performance</h3>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ color: 'white', marginBottom: '0.5rem' }}>Sprint Burndown</div>
          <div style={{ background: '#1f2937', height: '8px', borderRadius: '4px' }}>
            <div style={{ background: '#10b981', height: '100%', width: '68%', borderRadius: '4px' }}></div>
          </div>
          <div style={{ color: '#b8bcc8', fontSize: '0.8rem', marginTop: '0.25rem' }}>68% complete</div>
        </div>
        <div>
          <div style={{ color: 'white', marginBottom: '0.5rem' }}>Code Quality</div>
          <div style={{ background: '#1f2937', height: '8px', borderRadius: '4px' }}>
            <div style={{ background: '#3b82f6', height: '100%', width: '92%', borderRadius: '4px' }}></div>
          </div>
          <div style={{ color: '#b8bcc8', fontSize: '0.8rem', marginTop: '0.25rem' }}>92% quality score</div>
        </div>
      </div>
    </div>
  </div>
);

// Admin Dashboard
const AdminDashboard = () => {
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    activeProjects: 0,
    systemHealth: 0,
    aiAccuracy: 0
  });
  
  useEffect(() => {
    const targets = { totalUsers: 1247, activeProjects: 89, systemHealth: 98, aiAccuracy: 94 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedValues({
        totalUsers: Math.floor(targets.totalUsers * progress),
        activeProjects: Math.floor(targets.activeProjects * progress),
        systemHealth: Math.floor(targets.systemHealth * progress),
        aiAccuracy: Math.floor(targets.aiAccuracy * progress)
      });
      
      if (currentStep >= steps) clearInterval(interval);
    }, stepDuration);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem', 
          color: 'transparent',
          background: 'linear-gradient(135deg, #9333ea, #3b82f6)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          fontWeight: 'bold' 
        }}>Admin Dashboard</h1>
        <p style={{ color: '#b8bcc8', fontSize: '1.1rem' }}>System overview and administrative controls</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'Total Users', value: animatedValues.totalUsers, color: '#3b82f6', icon: Users },
          { label: 'Active Projects', value: animatedValues.activeProjects, color: '#10b981', icon: Target },
          { label: 'System Health', value: `${animatedValues.systemHealth}%`, color: '#f59e0b', icon: Activity },
          { label: 'AI Accuracy', value: `${animatedValues.aiAccuracy}%`, color: '#9333ea', icon: Brain }
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} style={{
              padding: '2rem',
              background: 'rgba(26, 26, 46, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '1rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: 'translateY(0)',
              boxShadow: `0 0 20px ${metric.color}20`
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${metric.color}, transparent)`,
                animation: 'shimmer 2s infinite'
              }} />
              <Icon size={32} style={{ color: metric.color, marginBottom: '1rem', filter: `drop-shadow(0 0 5px ${metric.color})` }} />
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: metric.color, 
                marginBottom: '0.5rem',
                textShadow: `0 0 10px ${metric.color}40`
              }}>{metric.value}</div>
              <div style={{ color: '#b8bcc8', fontSize: '0.9rem' }}>{metric.label}</div>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div style={{
          padding: '2rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#9333ea', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>System Controls</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            {[
              { label: 'User Management', icon: Users, status: 'Active' },
              { label: 'AI Training', icon: Brain, status: 'Running' },
              { label: 'System Backup', icon: Shield, status: 'Scheduled' },
              { label: 'Performance Monitor', icon: BarChart3, status: 'Online' },
              { label: 'Security Scan', icon: Shield, status: 'Complete' },
              { label: 'Data Analytics', icon: Activity, status: 'Processing' }
            ].map((control, i) => {
              const Icon = control.icon;
              return (
                <div key={i} style={{
                  padding: '1.5rem',
                  background: 'rgba(147, 51, 234, 0.1)',
                  border: '1px solid rgba(147, 51, 234, 0.3)',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(147, 51, 234, 0.1), transparent)',
                    transform: 'translateX(-100%)',
                    animation: `sweep 3s infinite ${i * 0.5}s`
                  }} />
                  <Icon size={24} style={{ color: '#9333ea', marginBottom: '0.5rem' }} />
                  <div style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{control.label}</div>
                  <div style={{ 
                    color: control.status === 'Active' || control.status === 'Running' || control.status === 'Online' ? '#10b981' : '#f59e0b', 
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>{control.status}</div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div style={{
          padding: '2rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ color: '#9333ea', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '600' }}>Live Activity</h3>
          
          {[
            { action: 'New user registered', time: '2 min ago', type: 'success' },
            { action: 'AI model updated', time: '5 min ago', type: 'info' },
            { action: 'System backup completed', time: '1 hour ago', type: 'success' },
            { action: 'Security scan initiated', time: '2 hours ago', type: 'warning' }
          ].map((activity, i) => (
            <div key={i} style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '0.5rem',
              marginBottom: '0.75rem',
              borderLeft: `3px solid ${activity.type === 'success' ? '#10b981' : activity.type === 'warning' ? '#f59e0b' : '#3b82f6'}`,
              animation: `fadeInUp 0.5s ease ${i * 0.1}s both`
            }}>
              <div style={{ color: 'white', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{activity.action}</div>
              <div style={{ color: '#b8bcc8', fontSize: '0.8rem' }}>{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
const AIInsights = () => (
  <div style={{ padding: '2rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'white', fontWeight: 'bold' }}>AI Insights</h1>
      <p style={{ color: '#b8bcc8', fontSize: '1.1rem' }}>Intelligent recommendations and predictive analytics</p>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div>
        <h2 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>Active Recommendations</h2>
        {[
          { type: 'Bottleneck Detection', title: 'Code Review Bottleneck Detected', desc: 'Sarah M. has 8 pending reviews. Suggest redistributing 3 to John D.', impact: 'High', action: 'Redistribute' },
          { type: 'Skill Gap', title: 'React Expertise Needed', desc: 'Upcoming frontend tasks require React skills. Consider training or hiring.', impact: 'Medium', action: 'Plan Training' },
          { type: 'Workload Optimization', title: 'Capacity Imbalance', desc: 'Team Alpha is at 95% capacity while Team Beta is at 60%. Rebalance recommended.', impact: 'High', action: 'Rebalance' }
        ].map((insight, i) => (
          <div key={i} style={{
            padding: '1.5rem',
            background: 'rgba(26, 26, 46, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase' }}>{insight.type}</div>
              <span style={{
                background: insight.impact === 'High' ? '#ef4444' : '#f59e0b',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '1rem',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>{insight.impact} Impact</span>
            </div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{insight.title}</h3>
            <p style={{ color: '#b8bcc8', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: '1.5' }}>{insight.desc}</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>{insight.action}</button>
              <button style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: '#b8bcc8',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>Dismiss</button>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <h2 style={{ color: '#3b82f6', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: '600' }}>Predictive Analytics</h2>
        <div style={{
          padding: '1.5rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem',
          marginBottom: '1.5rem'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Sprint Delivery Forecast</h3>
          <div style={{ color: '#10b981', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>94%</div>
          <p style={{ color: '#b8bcc8', fontSize: '0.9rem' }}>Probability of on-time delivery based on current velocity and remaining work.</p>
        </div>
        
        <div style={{
          padding: '1.5rem',
          background: 'rgba(26, 26, 46, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1rem'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem' }}>Team Burnout Risk</h3>
          <div style={{ color: '#f59e0b', fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Low</div>
          <p style={{ color: '#b8bcc8', fontSize: '0.9rem', marginBottom: '1rem' }}>Current workload distribution is sustainable. Monitor Sarah M. - approaching high utilization.</p>
          <div style={{ background: '#1f2937', height: '8px', borderRadius: '4px' }}>
            <div style={{ background: '#f59e0b', height: '100%', width: '25%', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  
  const renderPage = () => {
    switch(currentPage) {
      case 'landing': return <Landing setCurrentPage={setCurrentPage} />;
      case 'dashboard': return <TeamDashboard />;
      case 'tasks': return <TasksPage />;
      case 'manager': return <ManagerDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'insights': return <AIInsights />;
      default: return <Landing setCurrentPage={setCurrentPage} />;
    }
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <ShaderBackground />
      
      {currentPage !== 'landing' && (
        <>
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <TopNav />
          <div style={{ marginLeft: '260px', marginTop: '70px' }}>
            {renderPage()}
          </div>
        </>
      )}
      
      {currentPage === 'landing' && (
        <>
          <TopNav />
          {renderPage()}
        </>
      )}
    </div>
  );
}

export default App;
