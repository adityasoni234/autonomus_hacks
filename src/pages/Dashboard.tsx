import React from 'react';
import { Brain, Users, TrendingUp, BarChart3, Clock, Target, Shield, Activity } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard - All Features</h1>
      
      <div className={styles.featuresGrid}>
        <div className={styles.featureSection}>
          <h2 className={styles.sectionTitle}>For Team Members</h2>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <Brain className={styles.featureIcon} />
              <h3>AI-Recommended Tasks</h3>
              <p>Personalized dashboard with intelligent task suggestions</p>
            </div>
            <div className={styles.featureCard}>
              <Activity className={styles.featureIcon} />
              <h3>Smart Notifications</h3>
              <p>Only relevant updates to keep you focused</p>
            </div>
            <div className={styles.featureCard}>
              <BarChart3 className={styles.featureIcon} />
              <h3>Workload Visibility</h3>
              <p>Capacity alerts and workload monitoring</p>
            </div>
            <div className={styles.featureCard}>
              <Clock className={styles.featureIcon} />
              <h3>Automated Time Tracking</h3>
              <p>Effortless time management and reporting</p>
            </div>
            <div className={styles.featureCard}>
              <Target className={styles.featureIcon} />
              <h3>Context-Aware Tasks</h3>
              <p>Task details that adapt to your workflow</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSection}>
          <h2 className={styles.sectionTitle}>For Project Managers</h2>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <Shield className={styles.featureIcon} />
              <h3>Project Health Scores</h3>
              <p>AI-powered project analysis and insights</p>
            </div>
            <div className={styles.featureCard}>
              <TrendingUp className={styles.featureIcon} />
              <h3>Predictive Analysis</h3>
              <p>Timeline and budget forecasting</p>
            </div>
            <div className={styles.featureCard}>
              <Target className={styles.featureIcon} />
              <h3>One-Click Sprint Planning</h3>
              <p>Streamlined sprint setup and management</p>
            </div>
            <div className={styles.featureCard}>
              <Activity className={styles.featureIcon} />
              <h3>Automated Risk Reports</h3>
              <p>Proactive risk identification and mitigation</p>
            </div>
            <div className={styles.featureCard}>
              <BarChart3 className={styles.featureIcon} />
              <h3>Team Performance Analytics</h3>
              <p>Comprehensive team productivity insights</p>
            </div>
          </div>
        </div>

        <div className={styles.featureSection}>
          <h2 className={styles.sectionTitle}>For Executives</h2>
          <div className={styles.featureCards}>
            <div className={styles.featureCard}>
              <TrendingUp className={styles.featureIcon} />
              <h3>Portfolio-Level Insights</h3>
              <p>High-level view of all projects and initiatives</p>
            </div>
            <div className={styles.featureCard}>
              <Users className={styles.featureIcon} />
              <h3>Resource Utilization</h3>
              <p>Optimize team allocation and capacity</p>
            </div>
            <div className={styles.featureCard}>
              <BarChart3 className={styles.featureIcon} />
              <h3>ROI & Efficiency Tracking</h3>
              <p>Measure return on investment and productivity</p>
            </div>
            <div className={styles.featureCard}>
              <Brain className={styles.featureIcon} />
              <h3>Strategic Recommendations</h3>
              <p>AI-driven strategic business insights</p>
            </div>
            <div className={styles.featureCard}>
              <Target className={styles.featureIcon} />
              <h3>Custom KPI Dashboards</h3>
              <p>Personalized metrics and performance indicators</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;