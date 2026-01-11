import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Users, Clock } from 'lucide-react';
import { api, Project } from '../services/api';
import styles from './Manager.module.css';

interface ManagerMetrics {
  sprintProgress: number;
  teamVelocity: number;
  riskScore: number;
  deliveryPrediction: number;
}

const Manager: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<ManagerMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, metricsData] = await Promise.all([
          api.getProjects(),
          api.getManagerMetrics(),
        ]);
        setProjects(projectsData);
        setMetrics(metricsData);
      } catch (error) {
        console.error('Failed to fetch manager data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'var(--error)';
      case 'medium': return 'var(--warning)';
      case 'low': return 'var(--success)';
      default: return 'var(--text-muted)';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'var(--success)';
    if (score >= 60) return 'var(--warning)';
    return 'var(--error)';
  };

  if (loading) {
    return (
      <div className={styles.manager}>
        <div className={styles.loading}>Loading manager dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.manager}>
      <header className={styles.header}>
        <h1 className={styles.title}>Project Manager Dashboard</h1>
        <p className={styles.subtitle}>Strategic oversight and team performance insights</p>
      </header>

      <div className={styles.metricsGrid}>
        {metrics && (
          <>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.sprintProgress}%</h3>
                <p className={styles.metricLabel}>Sprint Progress</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <Users size={24} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.teamVelocity}</h3>
                <p className={styles.metricLabel}>Team Velocity</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon} style={{ color: metrics.riskScore > 70 ? 'var(--error)' : 'var(--success)' }}>
                <AlertTriangle size={24} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.riskScore}%</h3>
                <p className={styles.metricLabel}>Risk Score</p>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <Clock size={24} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.deliveryPrediction}%</h3>
                <p className={styles.metricLabel}>On-Time Delivery</p>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.projectsSection}>
        <h2 className={styles.sectionTitle}>Project Health Overview</h2>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <div className={styles.projectHeader}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <div 
                  className={styles.healthScore}
                  style={{ color: getHealthColor(project.healthScore) }}
                >
                  {project.healthScore}%
                </div>
              </div>
              
              <div className={styles.projectStats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Progress</span>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className={styles.statValue}>{project.progress}%</span>
                </div>

                <div className={styles.stat}>
                  <span className={styles.statLabel}>Risk Level</span>
                  <span 
                    className={styles.riskBadge}
                    style={{ 
                      backgroundColor: getRiskColor(project.riskLevel),
                      color: 'white'
                    }}
                  >
                    {project.riskLevel}
                  </span>
                </div>

                <div className={styles.stat}>
                  <span className={styles.statLabel}>Team Size</span>
                  <span className={styles.statValue}>{project.teamSize} members</span>
                </div>
              </div>

              <div className={styles.projectFooter}>
                <span className={styles.projectStatus}>{project.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.aiInsights}>
        <h2 className={styles.sectionTitle}>AI Recommendations</h2>
        <div className={styles.insightsList}>
          <div className={styles.insight}>
            <div className={styles.insightIcon}>
              <AlertTriangle size={20} />
            </div>
            <div className={styles.insightContent}>
              <h4 className={styles.insightTitle}>Resource Reallocation Suggested</h4>
              <p className={styles.insightDescription}>
                Project Alpha shows 85% risk of delay. Consider moving 2 developers from Project Beta.
              </p>
              <span className={styles.insightConfidence}>Confidence: 92%</span>
            </div>
          </div>

          <div className={styles.insight}>
            <div className={styles.insightIcon}>
              <TrendingUp size={20} />
            </div>
            <div className={styles.insightContent}>
              <h4 className={styles.insightTitle}>Sprint Velocity Optimization</h4>
              <p className={styles.insightDescription}>
                Team velocity can increase by 15% by adjusting task complexity distribution.
              </p>
              <span className={styles.insightConfidence}>Confidence: 78%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manager;