import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Users, TrendingUp, ArrowRight } from 'lucide-react';
import WaveAnimation from '../components/ui/WaveAnimation';
import styles from './Landing.module.css';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Brain />,
      title: 'Dynamic Role Assignment',
      description: 'AI automatically assigns the right role to the right person based on skills, workload, and context.',
    },
    {
      icon: <Users />,
      title: 'AI Task Orchestration', 
      description: 'Intelligent task distribution that adapts to team dynamics and project requirements.',
    },
    {
      icon: <TrendingUp />,
      title: 'Predictive Insights',
      description: 'Get ahead of bottlenecks with AI-powered predictions and strategic recommendations.',
    },
  ];

  return (
    <div className={styles.landing}>
      <WaveAnimation />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Orchestrix</h1>
          <p className={styles.subtitle}>
            AI that assigns the right role to the right person
          </p>
          <p className={styles.description}>
            Transform your team's productivity with intelligent work orchestration. 
            Our AI understands your team dynamics, predicts bottlenecks, and optimizes 
            task distribution for maximum efficiency.
          </p>
          <div className={styles.actions}>
            <Link to="/dashboard" className={styles.primaryButton}>
              View Dashboard
              <ArrowRight size={20} />
            </Link>
            <Link to="/admin" className={styles.secondaryButton}>
              Admin Panel
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.keyFeatures}>
        <div className={styles.keyFeaturesContent}>
          <h2 className={styles.keyFeaturesTitle}>✨ Key Features</h2>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureSection}>
              <h3 className={styles.sectionTitle}>For Team Members:</h3>
              <ul className={styles.featureList}>
                <li>✅ Personalized dashboard with AI-recommended tasks</li>
                <li>✅ Smart notifications (only relevant updates)</li>
                <li>✅ Workload visibility and capacity alerts</li>
                <li>✅ Automated time tracking</li>
                <li>✅ Context-aware task details</li>
              </ul>
            </div>

            <div className={styles.featureSection}>
              <h3 className={styles.sectionTitle}>For Project Managers:</h3>
              <ul className={styles.featureList}>
                <li>✅ AI-powered project health scores</li>
                <li>✅ Predictive timeline and budget analysis</li>
                <li>✅ One-click sprint planning</li>
                <li>✅ Automated risk reports</li>
                <li>✅ Team performance analytics</li>
              </ul>
            </div>

            <div className={styles.featureSection}>
              <h3 className={styles.sectionTitle}>For Executives:</h3>
              <ul className={styles.featureList}>
                <li>✅ Portfolio-level insights</li>
                <li>✅ Resource utilization metrics</li>
                <li>✅ ROI and efficiency tracking</li>
                <li>✅ Strategic recommendations</li>
                <li>✅ Custom KPI dashboards</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to orchestrate your team's success?</h2>
          <p className={styles.ctaDescription}>
            Join teams that have increased their productivity by 40% with AI-powered work orchestration.
          </p>
          <Link to="/dashboard" className={styles.ctaButton}>
            Get Started
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;