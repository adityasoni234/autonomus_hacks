import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { api, Task, WorkloadData } from '../services/api';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [workload, setWorkload] = useState<WorkloadData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, workloadData] = await Promise.all([
          api.getTasks('current-user'),
          api.getWorkload('current-user'),
        ]);
        setTasks(tasksData);
        setWorkload(workloadData);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical': return 'var(--error)';
      case 'high': return 'var(--warning)';
      case 'medium': return 'var(--info)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done': return <CheckCircle size={16} />;
      case 'in-progress': return <Clock size={16} />;
      default: return <AlertTriangle size={16} />;
    }
  };

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.loading}>Loading your personalized dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Dashboard</h1>
        <p className={styles.subtitle}>AI-curated tasks and insights for your role</p>
      </header>

      <div className={styles.grid}>
        {/* Workload Meter */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Workload Status</h3>
            <User size={20} />
          </div>
          {workload && (
            <div className={styles.workloadMeter}>
              <div className={styles.meterBar}>
                <div 
                  className={styles.meterFill}
                  style={{ 
                    width: `${(workload.currentLoad / workload.capacity) * 100}%`,
                    backgroundColor: workload.burnoutRisk > 0.7 ? 'var(--error)' : 
                                   workload.burnoutRisk > 0.4 ? 'var(--warning)' : 'var(--success)'
                  }}
                />
              </div>
              <div className={styles.workloadStats}>
                <span>Load: {workload.currentLoad}/{workload.capacity}</span>
                <span>Efficiency: {Math.round(workload.efficiency * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Task Feed */}
        <div className={`${styles.card} ${styles.taskFeed}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Your Tasks</h3>
            <span className={styles.taskCount}>{tasks.length} active</span>
          </div>
          <div className={styles.taskList}>
            {tasks.map((task) => (
              <div key={task.id} className={styles.taskCard}>
                <div className={styles.taskHeader}>
                  <div className={styles.taskStatus}>
                    {getStatusIcon(task.status)}
                    <span 
                      className={styles.priority}
                      style={{ color: getPriorityColor(task.priority) }}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <div className={styles.roleAssignment}>
                    <span className={styles.role}>{task.assignedRole}</span>
                  </div>
                </div>
                <h4 className={styles.taskTitle}>{task.title}</h4>
                <p className={styles.taskDescription}>{task.description}</p>
                {task.aiReason && (
                  <div className={styles.aiReason}>
                    <strong>Why you?</strong> {task.aiReason}
                  </div>
                )}
                <div className={styles.taskFooter}>
                  <span className={styles.deadline}>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                  <span className={styles.workloadImpact}>
                    Impact: {task.workloadImpact}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Notifications */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Smart Notifications</h3>
            <AlertTriangle size={20} />
          </div>
          <div className={styles.notifications}>
            <div className={styles.notification}>
              <div className={styles.notificationIcon} style={{ color: 'var(--warning)' }}>
                <AlertTriangle size={16} />
              </div>
              <div className={styles.notificationContent}>
                <p>High priority task deadline approaching in 2 hours</p>
                <span className={styles.notificationTime}>Just now</span>
              </div>
            </div>
            <div className={styles.notification}>
              <div className={styles.notificationIcon} style={{ color: 'var(--info)' }}>
                <CheckCircle size={16} />
              </div>
              <div className={styles.notificationContent}>
                <p>AI suggests taking a break - burnout risk detected</p>
                <span className={styles.notificationTime}>5 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;