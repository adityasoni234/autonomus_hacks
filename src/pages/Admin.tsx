import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Activity, AlertTriangle, CheckCircle, Clock, Target } from 'lucide-react';
import styles from './Admin.module.css';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const portfolioMetrics = [
    { label: 'Active Projects', value: '24', change: '+12%', icon: <Activity /> },
    { label: 'Team Utilization', value: '87%', change: '+5%', icon: <Users /> },
    { label: 'ROI This Quarter', value: '142%', change: '+18%', icon: <DollarSign /> },
    { label: 'Efficiency Score', value: '94', change: '+8%', icon: <Target /> },
  ];

  const projectHealth = [
    { name: 'E-commerce Platform', health: 92, status: 'On Track', risk: 'Low' },
    { name: 'Mobile App Redesign', health: 78, status: 'At Risk', risk: 'Medium' },
    { name: 'Data Analytics Tool', health: 95, status: 'Ahead', risk: 'Low' },
    { name: 'Customer Portal', health: 65, status: 'Behind', risk: 'High' },
  ];

  const teamPerformance = [
    { team: 'Frontend Team', efficiency: 89, workload: 'Optimal', alerts: 0 },
    { team: 'Backend Team', efficiency: 94, workload: 'High', alerts: 2 },
    { team: 'Design Team', efficiency: 87, workload: 'Low', alerts: 1 },
    { team: 'QA Team', efficiency: 91, workload: 'Optimal', alerts: 0 },
  ];

  const strategicRecommendations = [
    'Reallocate 2 developers from Design to Backend team to balance workload',
    'Consider hiring 1 additional QA engineer for Q2 scaling',
    'Implement automated testing to improve efficiency by 15%',
    'Schedule technical debt sprint for Customer Portal project',
  ];

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h1 className={styles.title}>Executive Dashboard</h1>
        <p className={styles.subtitle}>Portfolio-level insights and strategic analytics</p>
      </div>

      <div className={styles.tabs}>
        {['overview', 'projects', 'teams', 'analytics'].map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className={styles.overview}>
          <div className={styles.metricsGrid}>
            {portfolioMetrics.map((metric, index) => (
              <div key={index} className={styles.metricCard}>
                <div className={styles.metricIcon}>{metric.icon}</div>
                <div className={styles.metricContent}>
                  <h3 className={styles.metricValue}>{metric.value}</h3>
                  <p className={styles.metricLabel}>{metric.label}</p>
                  <span className={styles.metricChange}>{metric.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.recommendationsCard}>
            <h3 className={styles.cardTitle}>
              <Target className={styles.cardIcon} />
              Strategic Recommendations
            </h3>
            <div className={styles.recommendations}>
              {strategicRecommendations.map((rec, index) => (
                <div key={index} className={styles.recommendation}>
                  <CheckCircle className={styles.recIcon} />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className={styles.projects}>
          <div className={styles.projectsHeader}>
            <h3 className={styles.sectionTitle}>Project Health Scores</h3>
            <p className={styles.sectionSubtitle}>AI-powered project analysis and risk assessment</p>
          </div>
          <div className={styles.projectsList}>
            {projectHealth.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectInfo}>
                  <h4 className={styles.projectName}>{project.name}</h4>
                  <div className={styles.projectMetrics}>
                    <div className={styles.healthScore}>
                      <span className={styles.scoreLabel}>Health Score</span>
                      <span className={`${styles.score} ${project.health >= 90 ? styles.excellent : project.health >= 75 ? styles.good : styles.warning}`}>
                        {project.health}
                      </span>
                    </div>
                    <div className={styles.projectStatus}>
                      <span className={styles.statusLabel}>Status</span>
                      <span className={`${styles.status} ${project.status === 'On Track' ? styles.onTrack : project.status === 'Ahead' ? styles.ahead : styles.atRisk}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className={styles.riskLevel}>
                      <span className={styles.riskLabel}>Risk</span>
                      <span className={`${styles.risk} ${project.risk === 'Low' ? styles.lowRisk : project.risk === 'Medium' ? styles.mediumRisk : styles.highRisk}`}>
                        {project.risk}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'teams' && (
        <div className={styles.teams}>
          <div className={styles.teamsHeader}>
            <h3 className={styles.sectionTitle}>Team Performance Analytics</h3>
            <p className={styles.sectionSubtitle}>Resource utilization and capacity management</p>
          </div>
          <div className={styles.teamsList}>
            {teamPerformance.map((team, index) => (
              <div key={index} className={styles.teamCard}>
                <div className={styles.teamInfo}>
                  <h4 className={styles.teamName}>{team.team}</h4>
                  <div className={styles.teamMetrics}>
                    <div className={styles.efficiency}>
                      <span className={styles.efficiencyLabel}>Efficiency</span>
                      <span className={styles.efficiencyValue}>{team.efficiency}%</span>
                    </div>
                    <div className={styles.workload}>
                      <span className={styles.workloadLabel}>Workload</span>
                      <span className={`${styles.workloadValue} ${team.workload === 'Optimal' ? styles.optimal : team.workload === 'High' ? styles.high : styles.low}`}>
                        {team.workload}
                      </span>
                    </div>
                    <div className={styles.alerts}>
                      {team.alerts > 0 ? (
                        <div className={styles.alertBadge}>
                          <AlertTriangle size={16} />
                          <span>{team.alerts} alerts</span>
                        </div>
                      ) : (
                        <div className={styles.noAlerts}>
                          <CheckCircle size={16} />
                          <span>No alerts</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className={styles.analytics}>
          <div className={styles.analyticsGrid}>
            <div className={styles.kpiCard}>
              <h3 className={styles.kpiTitle}>Custom KPI Dashboard</h3>
              <div className={styles.kpiMetrics}>
                <div className={styles.kpiItem}>
                  <span className={styles.kpiLabel}>Delivery Rate</span>
                  <span className={styles.kpiValue}>96.2%</span>
                </div>
                <div className={styles.kpiItem}>
                  <span className={styles.kpiLabel}>Budget Variance</span>
                  <span className={styles.kpiValue}>-2.1%</span>
                </div>
                <div className={styles.kpiItem}>
                  <span className={styles.kpiLabel}>Client Satisfaction</span>
                  <span className={styles.kpiValue}>4.8/5</span>
                </div>
                <div className={styles.kpiItem}>
                  <span className={styles.kpiLabel}>Time to Market</span>
                  <span className={styles.kpiValue}>-15%</span>
                </div>
              </div>
            </div>
            
            <div className={styles.predictiveCard}>
              <h3 className={styles.predictiveTitle}>Predictive Analysis</h3>
              <div className={styles.predictions}>
                <div className={styles.prediction}>
                  <Clock className={styles.predictionIcon} />
                  <div>
                    <p className={styles.predictionText}>Q2 delivery forecast: 98% on-time completion</p>
                    <span className={styles.confidence}>Confidence: 87%</span>
                  </div>
                </div>
                <div className={styles.prediction}>
                  <TrendingUp className={styles.predictionIcon} />
                  <div>
                    <p className={styles.predictionText}>Resource optimization could save $45K annually</p>
                    <span className={styles.confidence}>Confidence: 92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;