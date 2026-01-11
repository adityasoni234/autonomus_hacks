import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Target, BarChart3, PieChart } from 'lucide-react';
import { api } from '../services/api';
import styles from './Executive.module.css';

interface ExecutiveMetrics {
  portfolioHealth: number;
  resourceUtilization: number;
  roi: number;
  efficiency: number;
}

const Executive: React.FC = () => {
  const [metrics, setMetrics] = useState<ExecutiveMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsData = await api.getExecutiveMetrics();
        setMetrics(metricsData);
      } catch (error) {
        console.error('Failed to fetch executive data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const kpiData = [
    { label: 'Active Projects', value: '24', trend: '+12%', positive: true },
    { label: 'Team Members', value: '156', trend: '+8%', positive: true },
    { label: 'Avg. Delivery Time', value: '12.3d', trend: '-15%', positive: true },
    { label: 'Client Satisfaction', value: '94%', trend: '+3%', positive: true },
  ];

  if (loading) {
    return (
      <div className={styles.executive}>
        <div className={styles.loading}>Loading executive dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.executive}>
      <header className={styles.header}>
        <h1 className={styles.title}>Executive Dashboard</h1>
        <p className={styles.subtitle}>Strategic insights and portfolio performance</p>
      </header>

      <div className={styles.metricsGrid}>
        {metrics && (
          <>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <Target size={28} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.portfolioHealth}%</h3>
                <p className={styles.metricLabel}>Portfolio Health</p>
                <div className={styles.metricTrend}>
                  <TrendingUp size={16} />
                  <span>+5% from last quarter</span>
                </div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <Users size={28} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.resourceUtilization}%</h3>
                <p className={styles.metricLabel}>Resource Utilization</p>
                <div className={styles.metricTrend}>
                  <TrendingUp size={16} />
                  <span>Optimal range</span>
                </div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <DollarSign size={28} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.roi}%</h3>
                <p className={styles.metricLabel}>ROI</p>
                <div className={styles.metricTrend}>
                  <TrendingUp size={16} />
                  <span>+12% YoY</span>
                </div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <BarChart3 size={28} />
              </div>
              <div className={styles.metricContent}>
                <h3 className={styles.metricValue}>{metrics.efficiency}%</h3>
                <p className={styles.metricLabel}>Operational Efficiency</p>
                <div className={styles.metricTrend}>
                  <TrendingUp size={16} />
                  <span>Above industry avg</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.kpiSection}>
          <h2 className={styles.sectionTitle}>Key Performance Indicators</h2>
          <div className={styles.kpiGrid}>
            {kpiData.map((kpi, index) => (
              <div key={index} className={styles.kpiCard}>
                <div className={styles.kpiHeader}>
                  <span className={styles.kpiLabel}>{kpi.label}</span>
                  <span 
                    className={`${styles.kpiTrend} ${kpi.positive ? styles.positive : styles.negative}`}
                  >
                    {kpi.trend}
                  </span>
                </div>
                <div className={styles.kpiValue}>{kpi.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.chartSection}>
          <h2 className={styles.sectionTitle}>Resource Utilization Heatmap</h2>
          <div className={styles.heatmapPlaceholder}>
            <PieChart size={48} />
            <p>Interactive heatmap visualization</p>
            <span>Connect to analytics API</span>
          </div>
        </div>

        <div className={styles.aiRecommendations}>
          <h2 className={styles.sectionTitle}>Strategic AI Recommendations</h2>
          <div className={styles.recommendationsList}>
            <div className={styles.recommendation}>
              <div className={styles.recommendationHeader}>
                <h4 className={styles.recommendationTitle}>Scale Team Alpha</h4>
                <span className={styles.impactBadge}>High Impact</span>
              </div>
              <p className={styles.recommendationDescription}>
                AI analysis suggests expanding Team Alpha by 3 senior developers to capture 
                emerging market opportunity. Projected ROI: 180% within 6 months.
              </p>
              <div className={styles.recommendationFooter}>
                <span className={styles.confidence}>Confidence: 94%</span>
                <button className={styles.actionButton}>Review Details</button>
              </div>
            </div>

            <div className={styles.recommendation}>
              <div className={styles.recommendationHeader}>
                <h4 className={styles.recommendationTitle}>Optimize Resource Allocation</h4>
                <span className={styles.impactBadge}>Medium Impact</span>
              </div>
              <p className={styles.recommendationDescription}>
                Redistribute 15% of resources from Project Beta to Project Gamma to 
                maximize portfolio efficiency and reduce delivery risks.
              </p>
              <div className={styles.recommendationFooter}>
                <span className={styles.confidence}>Confidence: 87%</span>
                <button className={styles.actionButton}>Review Details</button>
              </div>
            </div>

            <div className={styles.recommendation}>
              <div className={styles.recommendationHeader}>
                <h4 className={styles.recommendationTitle}>Technology Investment</h4>
                <span className={styles.impactBadge}>Strategic</span>
              </div>
              <p className={styles.recommendationDescription}>
                Invest in AI automation tools to reduce manual overhead by 25% 
                and improve team satisfaction scores.
              </p>
              <div className={styles.recommendationFooter}>
                <span className={styles.confidence}>Confidence: 91%</span>
                <button className={styles.actionButton}>Review Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Executive;